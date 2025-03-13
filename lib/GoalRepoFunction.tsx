// src/repositories/UserRepository.ts
import * as mongoRepo from "./mongodb/repository/GoalRepo";
import * as sqlRepo from "./mysql/repository/GoalRepo";

class GoalRepository {
  private static instance: GoalRepository;
  private repo: typeof mongoRepo | typeof sqlRepo;

  private constructor(dbType:string) {
    switch (dbType) {
      case "mongodb":
        this.repo = mongoRepo;
        break;
      case "mysql":
        this.repo = sqlRepo;
        break;
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }

  static getInstance(dbType:string): GoalRepository {
    if (!GoalRepository.instance) {
      GoalRepository.instance = new GoalRepository(dbType);
    }
    return GoalRepository.instance;
  }

  async getAllFitnessGoals(userId:number) {
    return this.repo.getAllFitnessGoals(userId);
  }

  async getSingleFitnessGoal(goalId: number|string) {
    return this.repo.getSingleFitnessGoal(goalId);
  }

  async createFitnessGoal(
  userId: number,
  goalType: string,
  targetValue: number,
  currentProgress: number,
  startDate: string,
  endDate: string,
  status:string) {
    return this.repo.createFitnessGoal(userId, goalType, targetValue, currentProgress, startDate,endDate,status);
  }

  async updateFitnessGoal( 
  goal_id: string|number,
  targetValue: number,
  currentProgress: number,
  status: string
) {
    return this.repo.updateFitnessGoal(goal_id,targetValue,currentProgress,status);
  }

  async deleteFitnessGoal(goal_id: string|number) {
    return this.repo.deleteFitnessGoal(goal_id);
  }

  async getAllFitnesswithUsername(){
    return this.repo.getAllFitnesswithUsername()
  };
}

export default GoalRepository;

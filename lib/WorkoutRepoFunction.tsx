// src/repositories/UserRepository.ts
import * as mongoRepo from "./mongodb/repository/WorkoutRepo";
import * as sqlRepo from "./mysql/repository/WorkoutRepo";

class WorkoutRepository {
  private static instance: WorkoutRepository;
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

  static getInstance(dbType:string): WorkoutRepository {
    if (!WorkoutRepository.instance) {
      WorkoutRepository.instance = new WorkoutRepository(dbType);
    }
    return WorkoutRepository.instance;
  }

  async getAllWorkouts() {
    return this.repo.getAllWorkouts();
  }

  async getWorkoutsByUser(userId: number|string) {
    return this.repo.getWorkoutsByUser(userId);
  }

  async createWorkout(userId: number,
  exerciseType: string,
  duration: number,
  caloriesBurned: number,
  workoutDate: string) {
    return this.repo.createWorkout(userId, exerciseType, duration, caloriesBurned, workoutDate);
  }

  async findWorkout(  userId: number,
  workoutDate: string,
  exerciseType: string) {
    return this.repo.findWorkout(userId,workoutDate,exerciseType);
  }

  async getWorkoutById(workoutId: number|string) {
    return this.repo.getWorkoutById(workoutId);
  }

  async updateWorkout(  userId: number | string,
  workoutId: number,
  exerciseType: string,
  duration: number,
  caloriesBurned: number,
  workoutDate: string) {
    return this.repo.updateWorkout(userId,workoutId,exerciseType,duration,caloriesBurned,workoutDate);
  }

  async deleteWorkout(  userId: string | number,
  workoutId: string){
    return this.repo.deleteWorkout(userId,workoutId)
  };
}

export default WorkoutRepository;

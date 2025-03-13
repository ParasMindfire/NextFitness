import UserRepository from "@/lib/UserRepoFunctions";
import WorkoutRepository from "@/lib/WorkoutRepoFunction";
import GoalRepository from "@/lib/GoalRepoFunction";

const database=process.env.DB || '';

export const userRepo = UserRepository.getInstance(database);
export const workoutRepo=WorkoutRepository.getInstance(database);
export const fitnessGoalsRepo=GoalRepository.getInstance(database);
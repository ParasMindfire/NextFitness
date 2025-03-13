import mongoose from "mongoose";
import FitnessGoal from "../../../models/Fitness";
import connectDB from "../db";

export const getAllFitnessGoals = async (userId: string|number) => {
  userId=Number(userId)
  connectDB();
  const allFitness=await FitnessGoal.find();
  console.log("all goals ",allFitness);
  return await FitnessGoal.find({ user_id:userId });
};

export const getSingleFitnessGoal = async (goalId: string|number) => {
  goalId=Number(goalId);
  return await FitnessGoal.findById({goal_id:goalId});
};

export const getNextFitnessGoalId = async (): Promise<number> => {
  const lastGoal = await FitnessGoal.findOne().sort({ goal_id: -1 }); // Get the last goal
  return lastGoal ? lastGoal.goal_id + 1 : 1; // If no goal exists, start from 1
};

export const createFitnessGoal = async (
  userId: string|number,
  goalType: string|number,
  targetValue: number,
  currentProgress: number,
  startDate: string,
  endDate: string,
  status:string
) => {
  console.log("ok ",{userId,goalType,targetValue,currentProgress,startDate,endDate})
  const goalId = await getNextFitnessGoalId();
  const fitnessGoal = new FitnessGoal({
    goal_id:goalId,
    user_id: userId,
    goal_type: goalType,
    target_value: targetValue,
    current_progress: currentProgress,
    start_date: new Date(startDate),
    end_date: new Date(endDate),
    status:status
  });
  return await fitnessGoal.save();
};

export const updateFitnessGoal = async (
  goal_id: string|number,
  targetValue: number,
  currentProgress: number,
  status: string
) => {
  console.log("yahan kya ar babu 1",goal_id);
  console.log("yahan kya ar babu 2",targetValue)
  console.log("yahan kya ar babu 3",currentProgress)

  goal_id=Number(goal_id);
  
    if (isNaN(goal_id)) {
      throw new Error(`Invalid goal_id: ${goal_id}`);
    }

  return await FitnessGoal.findOneAndUpdate(
    { goal_id:goal_id},
    { target_value: targetValue, current_progress: currentProgress, status },
    { new: true }
  );
};

export const deleteFitnessGoal = async (goal_id: string|number) => {
    goal_id=Number(goal_id);
    if (isNaN(goal_id)) {
      throw new Error(`Invalid goal_id: ${goal_id}`);
    }

    console.log("hau hela ");

  return await FitnessGoal.findOneAndDelete({goal_id});
};

export const getAllFitnesswithUsername = async () => {
  return await FitnessGoal.find().populate("user_id", "name email");
};

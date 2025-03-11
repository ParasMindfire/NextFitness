import mongoose from "mongoose";
import FitnessGoal from "../../models/Fitness";
import connectDB from "../db";

export const getAllFitnessGoals = async (userId: string) => {
  // connectDB();
  const allFitness=await FitnessGoal.find();
  console.log("all goals ",allFitness);
  return await FitnessGoal.find({ user_id:userId });
};

export const getSingleFitnessGoal = async (goalId: string) => {
  return await FitnessGoal.findById(goalId);
};

export const createFitnessGoal = async (
  userId: string,
  goalType: string,
  targetValue: number,
  currentProgress: number,
  startDate: string,
  endDate: string
) => {
  connectDB();
  const fitnessGoal = new FitnessGoal({
    user_id: userId,
    goal_type: goalType,
    target_value: targetValue,
    current_progress: currentProgress,
    start_date: new Date(startDate),
    end_date: new Date(endDate),
  });
  return await fitnessGoal.save();
};

export const updateFitnessGoal = async (
  goal_id: string,
  targetValue: number,
  currentProgress: number,
  status: string
) => {
  console.log("yahan kya ar babu 1",goal_id);
  console.log("yahan kya ar babu 2",targetValue)
  console.log("yahan kya ar babu 3",currentProgress)

  const numericGoalId = parseInt(goal_id, 10);
    if (isNaN(numericGoalId)) {
      throw new Error(`Invalid goal_id: ${goal_id}`);
    }

  return await FitnessGoal.findOneAndUpdate(
    { goal_id:numericGoalId},
    { target_value: targetValue, current_progress: currentProgress, status },
    { new: true }
  );
};

export const deleteFitnessGoal = async (goal_id: string) => {
    const numericGoalId = parseInt(goal_id, 10);
    if (isNaN(numericGoalId)) {
      throw new Error(`Invalid goal_id: ${goal_id}`);
    }

  return await FitnessGoal.findByIdAndDelete(goal_id);
};

export const getAllFitnesswithUsername = async () => {
  return await FitnessGoal.find().populate("user_id", "name email");
};

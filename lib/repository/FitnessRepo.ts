import FitnessGoal from "../../models/Fitness";

export const getAllFitnessGoals = async (userId: string) => {
  return await FitnessGoal.find({ user_id: userId });
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
  goalId: string,
  targetValue: number,
  currentProgress: number,
  status: string
) => {
  return await FitnessGoal.findByIdAndUpdate(
    goalId,
    { target_value: targetValue, current_progress: currentProgress, status },
    { new: true }
  );
};

export const deleteFitnessGoal = async (goalId: string) => {
  return await FitnessGoal.findByIdAndDelete(goalId);
};

export const getAllFitnesswithUsername = async () => {
  return await FitnessGoal.find().populate("user_id", "name email");
};

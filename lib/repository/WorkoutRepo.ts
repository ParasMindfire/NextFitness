import Workout from "../../models/Workout";
// import User from "../../models/User";

// Get all workouts with user details
export const getAllWorkouts = async (): Promise<any> => {
  return await Workout.find().populate("userId", "email name");
};

// Get all workouts for a specific user
export const getWorkoutsByUser = async (userId: string): Promise<any> => {
  return await Workout.find({ userId });
};

// Create a new workout
export const createWorkout = async (
  userId: string,
  exerciseType: string,
  duration: number,
  caloriesBurned: number,
  workoutDate: Date
): Promise<void> => {
  const workout = new Workout({
    userId,
    exerciseType,
    duration,
    caloriesBurned,
    workoutDate,
  });
  await workout.save();
};

// Find a workout by user ID, date, and exercise type
export const findWorkout = async (
  userId: string,
  workoutDate: Date,
  exerciseType: string
): Promise<any> => {
  return await Workout.findOne({ userId, workoutDate, exerciseType });
};

// Get a workout by its ID
export const getWorkoutById = async (workoutId: string): Promise<any> => {
  return await Workout.findById(workoutId);
};

// Update a workout
export const updateWorkout = async (
  userId: string,
  workoutId: string,
  exerciseType: string,
  duration: number,
  caloriesBurned: number,
  workoutDate: Date
): Promise<void> => {
  await Workout.findOneAndUpdate(
    { _id: workoutId, userId },
    { exerciseType, duration, caloriesBurned, workoutDate },
    { new: true }
  );
};

// Delete a workout
export const deleteWorkout = async (
  userId: string,
  workoutId: string
): Promise<void> => {
  await Workout.findOneAndDelete({ _id: workoutId, userId });
};

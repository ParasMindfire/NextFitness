import Workout from "../../../models/Workout";
// import User from "../../models/User";

// Get all workouts with user details
export const getAllWorkouts = async (): Promise<any> => {
  console.log("eloloo");
  return await Workout.find();
};

// Get all workouts for a specific user
export const getWorkoutsByUser = async (user_id: string|number): Promise<any> => {
  user_id=Number(user_id)
  console.log("type of ",typeof user_id);
  console.log("userid ",user_id);
  const wws=await Workout.find();
  console.log("wws ",wws);
  return await Workout.find({ user_id });
};

export const getNextWorkoutId = async (): Promise<number> => {
  const lastWorkout = await Workout.findOne().sort({ workout_id: -1 }); // Get the last workout
  return lastWorkout ? lastWorkout.workout_id + 1 : 1; // If no workout exists, start from 1
};

// Create a new workout
export const createWorkout = async (
  user_id: string | number,
  exercise_type: string,
  duration: number,
  calories_burned: number,
  workout_date: Date | string
) => {
  // Log input arguments  
  console.log("Received arguments:", { user_id, exercise_type, duration, calories_burned, workout_date });

  const workout_id = await getNextWorkoutId(); // Generate workout_id  

  user_id=Number(user_id);

  console.log("type of user id ",typeof user_id);
  console.log("type of workout id ",typeof workout_id);

  // Create workout object  
  const workout = new Workout({
    workout_id,
    user_id,
    exercise_type,
    duration,
    calories_burned,
    workout_date,
  });

  // Log the workout object before saving  
  console.log("Workout object before saving:", workout);

  // Save the workout object  
  const savedWorkout = await workout.save();

  // Log the saved workout object  
  console.log("Workout saved successfully:", savedWorkout);

  return savedWorkout;
};



// Find a workout by user ID, date, and exercise type
export const findWorkout = async (
  user_id: string | number,
  workout_date: string | Date,
  exercise_type: string
): Promise<any> => {
  console.log("datas kya are ", { user_id, workout_date, exercise_type });
  console.log("yahan arha ??");

  try {
    user_id = Number(user_id);
    console.log("Type of user_id after conversion:", typeof user_id);

    // Convert workout_date to a Date object
    const parsedDate = new Date(workout_date);
    console.log("Parsed workout_date:", parsedDate, "Type:", typeof parsedDate);

    // Find the workout
    const workout = await Workout.findOne({
      user_id,
      workout_date: parsedDate,
      exercise_type,
    });

    console.log("Workout Found:", workout);
    return workout;
  } catch (error) {
    console.error("Error in findWorkout:", error);
    throw new Error("Failed to fetch workout");
  }
};




// Get a workout by its ID
export const getWorkoutById = async (workoutId: string|number): Promise<any> => {
  return await Workout.findById(workoutId);
};

// Update a workout
export const updateWorkout = async (
  userId: string | number,
  workoutId: string | number,
  exerciseType: string,
  duration: number,
  caloriesBurned: number,
  workoutDate: Date | string
): Promise<void> => {
  await Workout.findOneAndUpdate(
    { workout_id: workoutId, user_id:userId },
    { exercise_type:exerciseType, duration, calories_burned:caloriesBurned, workout_date:workoutDate },
    { new: true }
  );
};

// Delete a workout
export const deleteWorkout = async (
  userId: string | number,
  workoutId: string
): Promise<void> => {
  userId=Number(userId);
  console.log("user id ",userId);
  console.log("workoutId ",workoutId);
  await Workout.findOneAndDelete({ workout_id: workoutId, user_id:userId });
};

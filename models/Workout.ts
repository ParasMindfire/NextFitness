import mongoose, { Schema, Document } from "mongoose";

// Define Workout Interface
interface IWorkout extends Document {
  workout_id: number;
  user_id: number;
  exercise_type: string;
  duration: number;
  calories_burned: number;
  workout_date: Date;
}

// Define Workout Schema
const WorkoutSchema = new Schema<IWorkout>({
  workout_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  exercise_type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories_burned: { type: Number, required: true },
  workout_date: { type: Date, required: true },
}, { timestamps: true });

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);
export default Workout;
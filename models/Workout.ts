import mongoose, { Schema, Document } from "mongoose";

// Define Workout Interface
interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  workoutDate: Date;
}

// Define Workout Schema
const WorkoutSchema = new Schema<IWorkout>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exerciseType: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  workoutDate: { type: Date, required: true },
});

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);
export default Workout;

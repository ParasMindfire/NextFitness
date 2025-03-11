import mongoose, { Schema, Document } from "mongoose";

// Interface for TypeScript support
interface IFitnessGoal extends Document {
  goal_id:number,
  userId: mongoose.Schema.Types.ObjectId;
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: Date;
  end_date: Date;
  status?: string;
}

// Define Fitness Goal Schema
const FitnessGoalSchema = new Schema<IFitnessGoal>(
  {
    goal_id:{type:Number,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal_type: { type: String, required: true },
    target_value: { type: Number, required: true },
    current_progress: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, default: "in-progress" },
  },
  { timestamps: true }
);

// Create FitnessGoal Model
const FitnessGoal = mongoose.model<IFitnessGoal>("Goal", FitnessGoalSchema);

export default FitnessGoal;

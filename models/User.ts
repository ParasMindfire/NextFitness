import mongoose, { Schema, Document } from "mongoose";

// Interface for TypeScript support
interface IUser extends Document {
  user_id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profile_pic?: string;
}

// Define User Schema
const UserSchema = new Schema<IUser>(
  {
    user_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profile_pic: { type: String },
  },
  { timestamps: true }
);

// Create User Model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
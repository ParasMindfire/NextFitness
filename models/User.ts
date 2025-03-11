import mongoose, { Schema, Document } from "mongoose";

// Interface for TypeScript support
interface IUser extends Document {
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

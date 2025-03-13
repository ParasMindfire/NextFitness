import User from "../../models/User";

// abstract class for repo there would be twio call sql and mongodb implementtaion and on ecommon which will take the argumnet as which class to call write if else according to argumnets type or you can implement in constructor

// Get all users
export const getAllUsers = async () => {
  return await User.find();
};

// Get user by email
export const getUserByEmail = async (email: string | undefined | null) => {
  return await User.findOne({ email });
};

// Get user by user_id
export const getUserById = async (user_id: number) => {
  return await User.findOne({ user_id });
};

// Add this function to fetch the next user_id
export const getNextUserId = async (): Promise<number> => {
  const lastUser = await User.findOne().sort({ user_id: -1 }); // Get last user by descending order
  return lastUser ? lastUser.user_id + 1 : 1; // If no user exists, start from 1
};

// Fix insertUser to generate user_id
export const insertUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  const user_id = await getNextUserId(); // Generate user_id
  const user = new User({ user_id, name, email, password, phone, address });
  return await user.save();
};

// Fix delete function to use user_id instead of email
export const deleteUserById = async (id: string) => {
  return await User.findOneAndDelete({ user_id: id });
};


// Update user password
export const updateUserPassword = async (email: string, newPassword: string) => {
  return await User.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true }
  );
};

// Delete user by email
export const deleteUserByEmail = async (email: string) => {
  return await User.findOneAndDelete({ email });
};

// Get user by user_id
export const getUserByUserId = async (user_id: number) => {
  try {
    const user = await User.findOne({ user_id });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

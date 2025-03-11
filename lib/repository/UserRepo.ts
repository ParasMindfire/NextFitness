import User from "../../models/User";

export const getAllUsers = async () => {
  return await User.find();
};


export const getUserByEmail = async (email: string | undefined | null) => {
  return await User.findOne({ email });
};


export const getUserById = async (id: string) => {
  return await User.findById(id);
};


export const insertUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  const user = new User({ name, email, password, phone, address });
  return await user.save();
};


export const updateUserPassword = async (email: string, newPassword: string) => {
  return await User.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true }
  );
};


export const deleteUserByEmail = async (email: string) => {
  return await User.findOneAndDelete({ email });
};


export const getIDByUserId = async (_id: string): Promise<any> => {
  try {
    // Step 1: Find the user by `_id`
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    
    return user;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw new Error("Failed to fetch workouts");
  }
};


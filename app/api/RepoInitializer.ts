import UserRepository from "@/lib/UserRepoFunctions";

const database=process.env.DB || '';

export const userRepo = UserRepository.getInstance(database);
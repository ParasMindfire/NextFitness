// src/repositories/UserRepository.ts
import * as mongoRepo from "./mongodb/repository/UserRepo";
import * as sqlRepo from "./mysql/repository/UserRepo";

class UserRepository {
  private static instance: UserRepository;
  private repo: typeof mongoRepo | typeof sqlRepo;

  private constructor(dbType:string) {
    switch (dbType) {
      case "mongodb":
        this.repo = mongoRepo;
        break;
      case "mysql":
        this.repo = sqlRepo;
        break;
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }

  static getInstance(dbType:string): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository(dbType);
    }
    return UserRepository.instance;
  }

  async getAllUsers() {
    return this.repo.getAllUsers();
  }

  async getUserByEmail(email: string) {
    return this.repo.getUserByEmail(email);
  }

  async insertUser(name: string, email: string, password: string, phone: string, address: string) {
    return this.repo.insertUser(name, email, password, phone, address);
  }

  async updateUserPassword(email: string, newPassword: string) {
    return this.repo.updateUserPassword(email, newPassword);
  }

  async deleteUserByEmail(email: string) {
    return this.repo.deleteUserByEmail(email);
  }

  async getUserById(user_id: number) {
    return this.repo.getUserById(user_id);
  }

  async deleteUserById(id: string){
    return this.repo.deleteUserById(id)
  };
}

export default UserRepository;

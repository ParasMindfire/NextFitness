export interface IUserRepo {
  getAllUsers(): Promise<any>;
  getUserById(user_id: number): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  insertUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ): Promise<any>;
  deleteUserById(user_id: number): Promise<any>;
  updateUserPassword(email: string, newPassword: string): Promise<any>;
}

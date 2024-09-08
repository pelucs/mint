import { User } from "../entities/user/user";
import { UpdateUserRequest } from "../use-cases/user/update-user";

export interface UserRepositories {
  create(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: UpdateUserRequest): Promise<void>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
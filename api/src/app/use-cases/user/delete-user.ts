import bcrypt from "bcrypt";

import { UserRepositories } from "../../repositories/user-repositories";
import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserIncorrectPasswordError } from "../../exceptions/user-incorrect-password-error";

export interface DeleteUserRequest {
  userId: string;
  password: string;
}

export class DeleteUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(data: DeleteUserRequest) {
    const { userId, password } = data;
    
    const user = await this.repository.findById(userId);

    if(!user) {
      throw new UserNotFoundError();
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
      throw new UserIncorrectPasswordError();
    }

    await this.repository.delete(userId);
  }
}
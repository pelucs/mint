import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepositories } from "../../repositories/user-repositories";
import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserIncorrectPasswordError } from "../../exceptions/user-incorrect-password-error";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class LoginUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute({ email, password }: LoginUserRequest): Promise<{ token: string }> {
    
    const user = await this.repository.findByEmail(email);

    if(!user) {
      throw new UserNotFoundError();
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
      throw new UserIncorrectPasswordError()
    }

    const token = jwt.sign({
      id: user.id,
    }, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });

    return { token }
  }
}
import bcrypt from "bcrypt";

import { User } from "../../entities/user/user";
import { UserRepositories } from "../../repositories/user-repositories";
import { UserAlreadyExistError } from "../../exceptions/user-already-exist-error";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  
  constructor(
    private repository: UserRepositories
  ) {}

  async execute({ name, email, password }: CreateUserRequest): Promise<{ user: User }> {
    
    const isAlreadyUser = await this.repository.findByEmail(email);

    if(isAlreadyUser) {
      throw new UserAlreadyExistError();
    }

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await this.repository.create(user);

    return { user }
  }
}
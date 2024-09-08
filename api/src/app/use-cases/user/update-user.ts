import { UserRepositories } from "../../repositories/user-repositories";
import { UserNotFoundError } from "../../exceptions/user-not-found-error";

export interface UpdateUserRequest {
  name?: string;
}

export class UpdateUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(userId: string, data: UpdateUserRequest) {
    const { name } = data;
    
    const user = await this.repository.findById(userId);

    if(!user) {
      throw new UserNotFoundError();
    }

    await this.repository.update(userId, {
      name,
    });

    return { user }
  }
}
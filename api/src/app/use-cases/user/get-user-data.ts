import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserRepositories } from "../../repositories/user-repositories";

interface GetUserDataRequest {
  userId: string;
}

export class GetUserData {
  
  constructor(
    private repository: UserRepositories
  ) {}

  async execute({ userId }: GetUserDataRequest) {
    const user = await this.repository.findById(userId);

    if(!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
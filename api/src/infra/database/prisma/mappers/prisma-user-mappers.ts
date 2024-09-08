import { User } from "../../../../app/entities/user/user";
import { User as UserFromPrisma } from "@prisma/client";

export class PrismaUserMappers {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createAt: user.createAt,
    }
  }

  static toDomain(user: UserFromPrisma) {
    return new User({
      name: user.name,
      email: user.email,
      password: user.password,
      createAt: user.createAt,
    }, user.id)
  }
}
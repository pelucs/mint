import { User } from "../../../../app/entities/user/user";
import { prisma } from "../prisma-client";
import { UserRepositories } from "../../../../app/repositories/user-repositories";
import { PrismaUserMappers } from "../mappers/prisma-user-mappers";
import { UpdateUserRequest } from "../../../../app/use-cases/user/update-user";

export class PrismaUserRepositories implements UserRepositories {

  // Buscando um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if(!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user);
  }

  // Buscando um usuário pelo id
  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });

    if(!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user);
  }

  // Criação de um usuário
  async create(user: User): Promise<void> {

    const data = PrismaUserMappers.toPrisma(user);

    await prisma.user.create({
      data,
    });
  }

  // Alteração dos dados do usuário
  async update(userId: string, data: UpdateUserRequest): Promise<void> {
    
    // Partial: utilitário do Typescript que transforma todos os campos opcioais
    const dataToUpdate: Partial<UpdateUserRequest> = {};

    // Adiciona ao objeto dataToUpdate caso exista valor
    if (data.name) { dataToUpdate.name = data.name };

    if(Object.keys(dataToUpdate).length > 0) {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: dataToUpdate,
      });
    }
  }

  // Deleta a conta de um usuário
  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
  }
}
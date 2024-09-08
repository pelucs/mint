import { z } from "zod";
import { LoginUser } from "../../../../app/use-cases/user/login-user";
import { CreateUser } from "../../../../app/use-cases/user/create-user";
import { GetUserData } from "../../../../app/use-cases/user/get-user-data";
import { Request, Response } from "express";
import { UserNotFoundError } from "../../../../app/exceptions/user-not-found-error";
import { UserAlreadyExistError } from "../../../../app/exceptions/user-already-exist-error";
import { UserIncorrectPasswordError } from "../../../../app/exceptions/user-incorrect-password-error";
import { UpdateUser } from "../../../../app/use-cases/user/update-user";
import { DeleteUser } from "../../../../app/use-cases/user/delete-user";

export class UserController {
  
  constructor(
    private createUser: CreateUser,
    private loginUser: LoginUser,
    private getUserData: GetUserData,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
  ) {}

  // Criação de um usuário
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      });
      
      const { name, email, password } = bodySchema.parse(request.body);

      await this.createUser.execute({ name, email, password });
      response.status(201).json({ message: "Usuário criado com sucesso" }) ;     
      
    } catch(err) {
      if(err instanceof UserAlreadyExistError) {
        response.status(400).json({ message: err.message })
      }
      
      response.status(400).json(err);
    }
  }

  // Login do usuário
  async login(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = bodySchema.parse(request.body);

      const { token } = await this.loginUser.execute({ email, password });
      response.status(200).json({ token });   

    } catch(err) {
      if(err instanceof UserNotFoundError) {
        response.status(404).json({ message: err.message })
      }

      if(err instanceof UserIncorrectPasswordError) {
        response.status(401).json({ message: err.message })
      }
      
      response.status(400).json(err);
    }
  }

  // Resgatando os dados do usuário
  async getData(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        userId: z.string()
      });

      const { userId } = paramsSchema.parse(request.params);

      const { user } = await this.getUserData.execute({ userId });
      response.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createAt: user.createAt,
      });

    } catch(err) {
      if(err instanceof UserNotFoundError) {
        response.status(404).json({ message: err.message })
      }

      response.status(400).json(err);
    }
  }

  // Atualiza dados do usuário
  async update(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        userId: z.string()
      });

      const bodySchema = z.object({
        name: z.string().optional()
      });

      const { userId } = paramsSchema.parse(request.params);
      const { name } = bodySchema.parse(request.body);

      await this.updateUser.execute(userId, {
        name,
      });

      response.status(200).json({ message: "Dados alterados com sucesso" })
    } catch(err) {
      if(err instanceof UserNotFoundError) {
        response.status(404).json({ message: err.message })
      }

      response.status(400).json(err);
    }
  }

  // Deleta um usuário
  async delete(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        userId: z.string(),
      });
  
      const bodySchema = z.object({
        password: z.string(),
      });
  
      const { userId } = paramsSchema.parse(request.params);
      const { password } = bodySchema.parse(request.body);
  
      await this.deleteUser.execute({ userId, password });
      response.status(204).json({ message: "Conta deletada com sucesso" });

    } catch(err) {
      if (err instanceof UserNotFoundError) {
        response.status(404).json({ message: err.message });
      } else if (err instanceof UserIncorrectPasswordError) {
        response.status(403).json({ message: err.message });
      }

      response.status(400).json(err);
    }
  } 
}
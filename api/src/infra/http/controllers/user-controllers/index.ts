import { LoginUser } from "../../../../app/use-cases/user/login-user";
import { CreateUser } from "../../../../app/use-cases/user/create-user";
import { UserController } from "./user-controller";
import { PrismaUserRepositories } from "../../../database/prisma/repositories/prisma-user-repositories";
import { GetUserData } from "../../../../app/use-cases/user/get-user-data";
import { UpdateUser } from "../../../../app/use-cases/user/update-user";
import { DeleteUser } from "../../../../app/use-cases/user/delete-user";

const repository = new PrismaUserRepositories();

const loginUser = new LoginUser(repository);
const createUser = new CreateUser(repository);
const getUserData = new GetUserData(repository);
const updateUser = new UpdateUser(repository);
const deleteUser = new DeleteUser(repository);

const userController = new UserController(
  createUser,
  loginUser,
  getUserData,
  updateUser,
  deleteUser,
);

export { userController };

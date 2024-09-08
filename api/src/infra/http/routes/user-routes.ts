import { Router } from "express";
import { validateJWT } from "../../../app/middleware/authentication";
import { userController } from "../controllers/user-controllers";

const userRouter = Router();

userRouter.post("/create", (request, response) => userController.create(request, response));
userRouter.post("/login", (request, response) => userController.login(request, response));
userRouter.get("/:userId", validateJWT, (request, response) => userController.getData(request, response));
userRouter.put("/:userId/update", validateJWT, (request, response) => userController.update(request, response));
userRouter.delete("/:userId/delete", validateJWT, (request, response) => userController.delete(request, response));

export { userRouter }
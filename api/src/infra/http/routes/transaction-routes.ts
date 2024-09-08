import { Router } from "express";
import { validateJWT } from "../../../app/middleware/authentication";
import { transactionController } from "../controllers/transaction-controllers";

const transactionRouter = Router();

transactionRouter.post("/create", validateJWT, (request, response) => transactionController.create(request, response));
transactionRouter.get("/:userId/all", validateJWT, (request, response) => transactionController.getAll(request, response));

export { transactionRouter }
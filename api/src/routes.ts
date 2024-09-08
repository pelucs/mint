import { Router } from "express";
import { userRouter } from "./infra/http/routes/user-routes";
import { transactionRouter } from "./infra/http/routes/transaction-routes";

const router = Router();

router.use("/user", userRouter);
router.use("/transaction", transactionRouter);

export { router }
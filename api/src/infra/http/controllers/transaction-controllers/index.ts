import { CreateTransaction } from "../../../../app/use-cases/transaction/create-transaction";
import { TransactionController } from "./transaction-controller";
import { PrismaTransactionRepositories } from "../../../database/prisma/repositories/prisma-transaction-repositories";
import { GetAllTransactions } from "../../../../app/use-cases/transaction/get-all-transactions";

const repositories = new PrismaTransactionRepositories();

const createTransaction = new CreateTransaction(repositories);
const getAllTransactions = new GetAllTransactions(repositories);

const transactionController = new TransactionController(
  createTransaction,
  getAllTransactions,
);

export { transactionController }
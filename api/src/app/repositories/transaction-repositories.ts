import { Transaction } from "../entities/transactions/transaction";
import { CreateTransactionRequest } from "../use-cases/transaction/create-transaction";
import { GetAllTransactionsRequest } from "../use-cases/transaction/get-all-transactions";

export interface TransactionRepositories {
  create(transaction: Transaction): Promise<void>;
  getAll(request: GetAllTransactionsRequest): Promise<Transaction[]>;
}
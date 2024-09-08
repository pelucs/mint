import { Transaction } from "../src/app/entities/transactions/transaction";
import { TransactionRepositories } from "../src/app/repositories/transaction-repositories";

export class InMemoryTransactionRepositories implements TransactionRepositories {
  
  public transactions: Transaction[] = [];
  
  // Criação de uma transação
  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async getAll(userId: string): Promise<Transaction[]> {
    const transactions = this.transactions.filter(transaction => transaction.userId === userId)
    return transactions;
  }
}
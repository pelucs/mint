import { prisma } from "../prisma-client";
import { Transaction } from "../../../../app/entities/transactions/transaction";
import { TransactionRepositories } from "../../../../app/repositories/transaction-repositories";
import { PrismaTransactionMappers } from "../mappers/prisma-transaction-mappers";
import { GetAllTransactionsRequest } from "../../../../app/use-cases/transaction/get-all-transactions";

export class PrismaTransactionRepositories implements TransactionRepositories {
  
  // Regatando todos as transações do usuário
  async getAll({ userId, query }: GetAllTransactionsRequest): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        dateAt: {
          lte: query.endDate ? new Date(query.endDate).toISOString() : undefined,
          gte: query.startDate ? new Date(query.startDate).toISOString() : undefined,
        }
      }
    });

    const transactionsToDomain = transactions.map(
      (transaction) => PrismaTransactionMappers.toDomain(transaction)
    );

    return transactionsToDomain;
  }

  // Criação de uma transação
  async create(transaction: Transaction): Promise<void> {

    const data = PrismaTransactionMappers.toPrisma(transaction);

    await prisma.transaction.create({
      data: data
    });
  }
}
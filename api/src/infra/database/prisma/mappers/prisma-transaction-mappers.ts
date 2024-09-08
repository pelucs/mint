import { Transaction } from "../../../../app/entities/transactions/transaction";
import { Transaction as TransactionFromPrisma } from "@prisma/client";

export class PrismaTransactionMappers {
  static toDomain(raw: TransactionFromPrisma): Transaction {
    return new Transaction({
      userId: raw.userId,
      description: raw.description,
      amount: raw.amount,
      dateAt: raw.dateAt,
      createAt: raw.createAt,
      attachment: JSON.parse(raw.attachment),
      category: raw.category,
      account: raw.account,
      method: raw.method,
      type: raw.type,
      note: raw.note,
    }, raw.id);
  }

  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      userId: transaction.userId,
      description: transaction.description,
      amount: transaction.amount,
      dateAt: transaction.dateAt,
      createAt: transaction.createAt,
      attachment: JSON.stringify(transaction.attachment),
      category: transaction.category,
      account: transaction.account,
      method: transaction.method,
      type: transaction.type,
      note: transaction.note,
    }
  }
}
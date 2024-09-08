import { Transaction } from "../../../app/entities/transactions/transaction";

export class TransactionViewModelMapper {
  static toHttp(transaction: Transaction) {
    return {
      id: transaction.id,
      userId: transaction.userId,
      description: transaction.description,
      amount: transaction.amount,
      dateAt: transaction.dateAt,
      createAt: transaction.createAt,
      attachment: transaction.attachment,
      category: transaction.category,
      account: transaction.account,
      method: transaction.method,
      type: transaction.type,
      note: transaction.note,
    }
  }
}
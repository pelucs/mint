import { Transaction } from "../../entities/transactions/transaction";
import { TransactionRepositories } from "../../repositories/transaction-repositories";

export interface CreateTransactionRequest {
  userId: string;
  description: string;
  amount: number;
  dateAt: Date;
  attachment: string[];
  type: string;
  category?: string;
  account?: string;
  method?: string;
  note?: string;
}

export class CreateTransaction {
  constructor(
    private repositories: TransactionRepositories
  ) {}

  async execute(data: CreateTransactionRequest) {    

    const transaction = new Transaction({
      userId: data.userId,
      description: data.description,
      amount: data.amount,
      dateAt: data.dateAt,
      attachment: data.attachment,
      category: data.category,
      account: data.account,
      method: data.method,
      type: data.type,
      note: data.note,
    })

    await this.repositories.create(transaction);

    return { transaction }
  }
}
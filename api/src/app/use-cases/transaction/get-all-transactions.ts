import { TransactionRepositories } from "../../repositories/transaction-repositories";

export interface GetAllTransactionsRequest {
  userId: string;
  query: {
    endDate: string | null | undefined;
    startDate: string | null | undefined;
  }
}

export class GetAllTransactions {
  constructor(
    private repository: TransactionRepositories
  ) {}

  async execute({ userId, query }: GetAllTransactionsRequest) {
    const transactions = await this.repository.getAll({ userId, query });

    return { transactions }
  }
} 
import { z } from "zod";
import { Request, Response } from "express";
import { CreateTransaction } from "../../../../app/use-cases/transaction/create-transaction";
import { GetAllTransactions } from "../../../../app/use-cases/transaction/get-all-transactions";
import { TransactionViewModelMapper } from "../../view-model/transaction-view-model";

export class TransactionController {
  constructor(
    private createTransaction: CreateTransaction,
    private getAllTransactions: GetAllTransactions,
  ) {}

  // Resgatando todas as transações do usuário
  async getAll(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        userId: z.string()
      });

      const querySchema = z.object({
        endDate: z.string().nullish(),
        startDate: z.string().nullish(),
      });
      
      const { userId } = paramsSchema.parse(request.params);
      const { endDate, startDate } = querySchema.parse(request.query);

      console.log("CHAMOU", userId)

      const { transactions } = await this.getAllTransactions.execute({ userId, query: { endDate, startDate } });

      const toHttp = transactions.map(
        (transaction) => TransactionViewModelMapper.toHttp(transaction)
      );

      response.status(200).json(toHttp);
    } catch(err) {
      response.status(400).json({ message: `Algo inesperado aconteceu: ` + err });
    }
  }

  // Criação de uma transação
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        userId: z.string(),
        description: z.string(),
        amount: z.coerce.number(),
        dateAt: z.coerce.date(),
        type: z.string(),
        attachment: z.string().array(),
        category: z.string().optional(),
        account: z.string().optional(),
        method: z.string().optional(),
        note: z.string().optional(),
      });

      const data = bodySchema.parse(request.body);

      await this.createTransaction.execute(data);
      response.status(201).json({ message: "Transação criada com sucesso" })
    } catch(err) {
      response.status(400).json({ message: `Algo inesperado aconteceu: ` + err });
    }
  }
}
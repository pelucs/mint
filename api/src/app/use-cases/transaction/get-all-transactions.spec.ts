import { CreateTransaction } from "./create-transaction";
import { GetAllTransactions } from "./get-all-transactions";
import { it, expect, describe } from "vitest";
import { InMemoryTransactionRepositories } from "../../../../test/in-memonry-transactio-repositories";

describe("Create a transaction", () => {

  const repositories = new InMemoryTransactionRepositories();
  const createTransaction = new CreateTransaction(repositories);
  const getAllTransactions = new GetAllTransactions(repositories);

  it("should be able to get all transactions", async () => {

    const transaction1 = await createTransaction.execute({
      userId: "usuario-1",
      description: "Licenciamento da moto",
      amount: 51.59,
      dateAt: new Date(),
      attachment: [""],
      category: "Conta de água",
      method: "Pix",
      account: "Nubank",
      type: "Saída"
    });

    const transaction2 = await createTransaction.execute({
      userId: "usuario-2",
      description: "Pagamento de conta de água",
      amount: 51.59,
      dateAt: new Date(),
      attachment: [""],
      category: "Conta de água",
      method: "Pix",
      account: "Nubank",
      type: "exit"
    });

    const { transactions } = await getAllTransactions.execute({ userId: transaction1.transaction.userId });

    expect(transactions).toBeTruthy();
    expect(transactions.length).toEqual(1);
  });
})
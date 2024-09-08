import { randomUUID } from "crypto";
import { CreateTransaction } from "./create-transaction";
import { it, expect, describe } from "vitest";
import { InMemoryTransactionRepositories } from "../../../../test/in-memonry-transactio-repositories";

describe("Create a transaction", () => {

  const repositories = new InMemoryTransactionRepositories();
  const createTransaction = new CreateTransaction(repositories);

  it("should be able to create a transaction", async () => {

    const { transaction } = await createTransaction.execute({
      userId: randomUUID(),
      description: "Salário",
      amount: 51.59,
      dateAt: new Date(),
      attachment: [""],
      category: "Conta de água",
      method: "Pix",
      account: "Nubank",
      type: "entrie"
    });

    expect(transaction).toBeTruthy();
    expect(transaction.account).toEqual("Nubank");
  });
})
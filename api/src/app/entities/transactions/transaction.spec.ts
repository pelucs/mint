import { randomUUID } from "crypto";
import { Transaction } from "./transaction";
import { it, expect, describe } from "vitest";

describe("Create a transaction", () => {
  it("should be able to create a transaction", () => {
    const transaction = new Transaction({
      userId: randomUUID(),
      description: "Pagamento da água",
      amount: 51.50,
      attachment: [""],
      dateAt: new Date(),
      type: "exit"
    });

    expect(transaction).toBeTruthy()
  });
})
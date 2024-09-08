import { User } from "./user";
import { it, expect, describe } from "vitest";

describe("Create a user", () => {
  it("should be able to create a user", () => {
    const user = new User({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    expect(user.name).equal("Pedro Lucas")
  });
})
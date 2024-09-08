import { CreateUser } from "./create-user";
import { it, expect, describe } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Create a user", () => {

  const repositories = new InMemoryUserRepositories();
  const createUser = new CreateUser(repositories);

  it("should be able to create a user", async () => {

    const { user } = await createUser.execute({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    expect(user).toBeTruthy();
  });
})
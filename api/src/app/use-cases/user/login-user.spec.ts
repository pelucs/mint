import { LoginUser } from "./login-user";
import { CreateUser } from "./create-user";
import { it, expect, describe } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Login a user", () => {

  const repositories = new InMemoryUserRepositories();
  const createUser = new CreateUser(repositories);
  const loginUser = new LoginUser(repositories);

  it("should be able to create a user and generate a valid token", async () => {

    const { user } = await createUser.execute({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    const { token } = await loginUser.execute({ 
      email: user.email,
      password: "123456",
    });

    expect(token).toBeTruthy();
    const parts = token.split(".");
    expect(parts.length).toBe(3);
  });
})
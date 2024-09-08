import { CreateUser } from "./create-user";
import { DeleteUser } from "./delete-user";
import { it, expect, describe } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Delete a user", () => {

  const repositories = new InMemoryUserRepositories();
  const createUser = new CreateUser(repositories);
  const deleteUser = new DeleteUser(repositories);

  it("should be able to create a user and delete user", async () => {

    const { user } = await createUser.execute({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    await deleteUser.execute({ userId: user.id, password: "123456" });

    expect(repositories.users.length).toBe(0);
  });
})
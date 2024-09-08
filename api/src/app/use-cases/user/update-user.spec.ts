import { CreateUser } from "./create-user";
import { UpdateUser } from "./update-user";
import { it, expect, describe } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Update a user", () => {

  const repositories = new InMemoryUserRepositories();
  const createUser = new CreateUser(repositories);
  const updateUser = new UpdateUser(repositories);

  it("should be able to update a user", async () => {

    const res = await createUser.execute({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    await updateUser.execute(res.user.id, {
      name: "Lucas"
    });

    expect(repositories.users[0].name).toEqual("Lucas");
  });
})
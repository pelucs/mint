import { CreateUser } from "./create-user";
import { GetUserData } from "./get-user-data";
import { it, expect, describe } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Get a user by id", () => {

  const repositories = new InMemoryUserRepositories();
  const createUser = new CreateUser(repositories);
  const getUserData = new GetUserData(repositories);

  it("should be able to get a user by id", async () => {

    const { user } = await createUser.execute({
      name: "Pedro Lucas",
      email: "pedro.lucas@gmail.com",
      password: "123456",
    });

    const userById = await getUserData.execute({ userId: user.id });

    expect(user.id).toEqual(userById.user.id);
  });
})
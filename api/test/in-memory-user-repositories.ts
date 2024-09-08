import { User } from "../src/app/entities/user/user";
import { UserRepositories } from "../src/app/repositories/user-repositories";
import { UpdateUserRequest } from "../src/app/use-cases/user/update-user";

export class InMemoryUserRepositories implements UserRepositories {
    
  public users: User[] = [];
  
  // Busca um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    
    if(!user) {
      return null
    }
    
    return user;
  }
  
  // Busca um usuário pelo id
  async findById(userId: string): Promise<User | null> {
    const user = this.users.find(user => user.id === userId);

    if(!user) {
      return null
    }
    
    return user;
  }
  
  // Altera dados do usuário
  async update(userId: string, data: UpdateUserRequest): Promise<void> {
    const userIndex = this.users.findIndex(
      (item) => item.id === userId
    );

    if(userIndex >= 0) {
      this.users[userIndex].name = data.name ?? this.users[userIndex].name;
    }
  }

  // Cria um usuário
  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  // Deleta a conta de um usuário
  async delete(userId: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
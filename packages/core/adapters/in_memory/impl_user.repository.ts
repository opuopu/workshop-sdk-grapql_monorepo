import { user } from "../../entities/index.js";
import { userRepository } from "../../repositories/index.js";

export const users: user[] = [];

export class InMemoryUserRepository implements userRepository {
  async findAuser(email: string): Promise<user | null> {
    const foundUser = users.find((user) => user.email === email);
    return Promise.resolve(foundUser || null);
  }

  async findAllUsers(): Promise<user[]> {
    return Promise.resolve(users);
  }

  async findUserById(id: string): Promise<user | null> {
    const foundUser = users.find((user) => user.id === id);
    return Promise.resolve(foundUser || null);
  }

  async createUser(user: user): Promise<user> {
    users.push(user);
    return Promise.resolve(user);
  }

  async updateUser(id: string, user: Partial<user>): Promise<user | null> {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(null);
    const existing = users[index];
    if (!existing) return Promise.resolve(null);
    users[index] = {
      id: existing.id,
      name: user.name ?? existing.name,
      email: user.email ?? existing.email,
    };
    return Promise.resolve(users[index]);
  }
}

import { user } from "../entities/user.entity";

export interface userRepository {
  findAuser: (email: string) => Promise<user | null>;
  findAllUsers: () => Promise<user[]>;
  findUserById: (id: string) => Promise<user | null>;
  createUser: (user: user) => Promise<user>;
  updateUser: (id: string, user: Partial<user>) => Promise<user | null>;
}

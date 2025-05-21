import { user } from "../entities/index.js";

export type createUserDTO = {
  name: string;
  email: string;
  password: string;
};

export class createNewUserCase {
  // TODO: Implement the use case logic
  constructor(private userRepository: any) {} // TODO: Replace 'any' with the actual type of your user repository

  //   Execute
  async execute(dto: createUserDTO): Promise<user> {
    this.validate(dto);
    // TODO: Implement check if user already exists
    const password = `hashed_${dto.password}`; // TODO: Implement password hashing
    const ifUserExists = this.userRepository.findAuser(dto.email);

    if (ifUserExists) {
      throw new Error("User already exists");
    }

    dto.password = password;
    const createUser = this.userRepository.createUser(dto);
    return createUser;
  }

  validate(dto: createUserDTO): void {
    if (!dto.name || !dto.email || !dto.password) {
      throw new Error("All fields are required");
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) {
      throw new Error("Invalid email format");
    }

    // Password validation: check if it's a valid UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(dto.password)) {
      throw new Error("Password must be a valid UUID");
    }
  }
}

// TODO

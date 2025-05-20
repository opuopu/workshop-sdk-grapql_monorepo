import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db, type User } from "../db/db";

const app: import("express").Express = express();
const port = 3000;
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// User registration route
app.post(
  "/register",
  async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Name, email, and password are required." });
      }

      // Check if user already exists
      //   await db.read();
      const existingUser = db.data?.users.find((u: User) => u.email === email);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists." });
      }

      // Mock password hashing
      const hashedPassword = `mock_hashed_${password}`;

      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
      };

      db.data?.users.push(newUser);
      await db.write();

      res
        .status(201)
        .json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login route
app.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    await db.read();
    const user = db.data?.users.find(
      (u: User) => u.email === email && u.password === `mock_hashed_${password}`
    );
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// View all accounts
app.get("/accounts", async (req: Request, res: Response) => {
  try {
    await db.read();
    const users =
      db.data?.users.map(({ password, ...rest }: User) => rest) || [];
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// View single account by id
app.get("/accounts/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await db.read();
    const user = db.data?.users.find((u: User) => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
export default app;

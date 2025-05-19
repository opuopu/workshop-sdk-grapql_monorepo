import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../db/db";
import { db } from "../db/db";

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
      await db.read();
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;

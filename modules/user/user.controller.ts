import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";

const service = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.register(req.body);
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.validateUser(req.body.email, req.body.password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { createTokenPair } from "./user.utils";
import { AuthenticatedRequest } from "../../types/auth";

const service = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || "hello_world_123_2026";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "hello_world_123_2026";

/**
 * @function register
 * @description Registers a new user with the provided credentials
 * Responds with 201 and token pair on success, or 400/500 on failure.
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password, repeatPassword, username } = req.body;

    if (!email || !password || !repeatPassword || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await service.register(req.body);

    if(!user) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const tokenPair = createTokenPair(user, JWT_SECRET, REFRESH_SECRET);

    res.status(201).json(tokenPair);
  } catch (err) {
    next(err);
  }
}

/**
    * @function login   
    * @description Validates user credentials
    * Responds with 201 and token pair on success, or 401 on invalid credentials
*/
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.validateUser(req.body.email, req.body.password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const tokenPair = createTokenPair(user, JWT_SECRET, REFRESH_SECRET);
    
    res.status(201).json(tokenPair);
  } catch (err) {
    next(err);
  }
}

/** 
 * @function getCurrentUser
 * @description Retrieves the currently authenticated user's information based on request JWT token
 * Responds with 200 and user information on success, or 401 on invalid or missing token.
 */
export async function getUserData(req: Request, res: Response, next: NextFunction) {
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.user.email; 
    try {
        const user = await service.getUserData({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
      next(err);
    }
}

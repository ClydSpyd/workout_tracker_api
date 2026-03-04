import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log error details for debugging
  console.error(err);

  // Set status code (default to 500 if not set)
  const status = err.status || 500;

  // Send error response
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      // Optionally include stack trace in development
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
}

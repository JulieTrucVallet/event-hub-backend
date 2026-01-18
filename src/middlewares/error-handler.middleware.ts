import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const message = err instanceof Error ? err.message : "Internal server error";
  return res.jsonError(message, 500);
};
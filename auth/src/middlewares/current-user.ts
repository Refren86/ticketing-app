import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface IUserPayload {
  id: string;
  email: string;
}
// awesome way to extend library type globally
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionJwt = req.session?.jwt;

  if (!sessionJwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      sessionJwt,
      process.env.JWT_KEY!
    ) as IUserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};

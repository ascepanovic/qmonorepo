import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const isAuthorized = function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid token");
  }
};

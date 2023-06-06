import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../services/auth.service";

interface UserInterface {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: string;
}
export interface AuthenticatedRequest extends Request {
  user?: UserInterface;
}

export const isAuthorized: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    const user = verifyToken(token);
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid token");
  }
};

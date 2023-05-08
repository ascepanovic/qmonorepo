import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const isAuthorized = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.header("Authorization");
  if (!accessToken) return res.status(400).send("Access denied. Invalid Token");
  try {
    const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("Exception", ex);
    res.status(400).send("Invalid token");
  }
};

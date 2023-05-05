import jwt from "jsonwebtoken";

export function generateAccessToken(user: any): string {
  return jwt.sign(user, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: process.env.ACCESS_TOKEN_EXP_TIME,
  });
}

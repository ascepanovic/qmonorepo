import jwt from "jsonwebtoken";

export function generateAccessToken(user: any): string {
  return jwt.sign(user, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: process.env.ACCESS_TOKEN_EXP_TIME,
  });
}

export const verifyToken = (token: string): any => {
  const secret = `${process.env.ACCESS_TOKEN_KEY}`;
  const user = jwt.verify(token, secret);
  return user;
};

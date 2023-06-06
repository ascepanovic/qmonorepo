import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateAccessToken } from "../services/auth.service";
import { findOrCreate } from "../services/user.service";
import { handleResponseError } from "../utils/global";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const oAuth2Client = new OAuth2Client(CLIENT_ID);

export const signInWithGoogle = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });
    if (ticket.getPayload() && ticket.getPayload()?.email_verified) {
      const data = {
        email: ticket.getPayload()?.email,
        photo: ticket.getPayload()?.picture,
        name: ticket.getPayload()?.name,
      };
      const user = await findOrCreate(data);
      const token = generateAccessToken(user);
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({ message: "Logged in successfully!" });
    }
  } catch (error) {
    console.error(error);
    handleResponseError(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json({
    message: "Logged out",
  });
};

export const checkUser = (req: any, res: Response) => {
  return res.status(200).send(req.user);
};
export const testUser = async (req: any, res: Response) => {
  const data = {
    email: `${Date.now()}@mail.com`,
    photo: "picture.jpg",
    name: "IME",
  };
  const user = await findOrCreate(data);
  const token = generateAccessToken(user);
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({ message: "Logged in successfully!" });
};

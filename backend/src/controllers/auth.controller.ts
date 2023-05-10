import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateAccessToken } from "../services/auth.service";
import { findOrCreate } from "../services/user.service";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;

const oAuth2Client = new OAuth2Client(CLIENT_ID);

export const signInWithGoogle = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    if (ticket.getPayload() && ticket.getPayload()?.email_verified) {
      const data = {
        email: ticket.getPayload()?.email,
        photo: ticket.getPayload()?.picture,
        name: ticket.getPayload()?.name,
      };
      const user = await findOrCreate(data);
      const token = generateAccessToken(user);
      return res.header("Authorization", token).json({ token }).status(200);
    }
  } catch (error) {
    console.log("ERROR GOOGLE LOGIN", error);
    return res.status(400).json({
      error: "Google Login Failed",
    });
  }
};

export const checkUser = (req: any, res: Response) => {
  return res.send(req.user).status(200);
};

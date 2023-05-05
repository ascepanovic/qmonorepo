import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { generateAccessToken } from "../services/auth.service";
import { isAuthorized } from "../middleware/isAuthorized";

dotenv.config();

const router: Router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google",
  }),
  (req: Request, res: Response) => {
    const accessToken = generateAccessToken(req.user);
    res.header("Authorization", accessToken).json({ accessToken }).status(200);
  }
);

router.get("/check", isAuthorized, (req: Request, res: Response) => {
  return res.send(req.user).status(200);
});

export { router as authRouter };

import express from "express";
import { Router } from "express";
import dotenv from "dotenv";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  checkUser,
  logout,
  signInWithGoogle,
} from "../controllers/auth.controller";
dotenv.config();

const router: Router = express.Router();

router.post("/login", signInWithGoogle);
router.get("/check", isAuthorized, checkUser);
router.get("/logout", isAuthorized, logout);

export { router as authRouter };

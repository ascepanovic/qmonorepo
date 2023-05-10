import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { isAuthorized } from "../middleware/isAuthorized";
import { checkUser, signInWithGoogle } from "../controllers/auth.controller";
dotenv.config();

const router: Router = express.Router();

router.post("/login", signInWithGoogle);
router.get("/check", isAuthorized, checkUser);

export { router as authRouter };

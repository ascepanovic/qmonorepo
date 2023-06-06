import express from "express";
import { Router } from "express";
import dotenv from "dotenv";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  checkUser,
  logout,
  signInWithGoogle,
  testUser,
} from "../controllers/auth.controller";
dotenv.config();

const router: Router = express.Router();

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Return test user cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving questions
 */
router.get("/", testUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Google login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Signed in successfully
 *       400:
 *         description: Bad request
 */
router.post("/login", signInWithGoogle);
/**
 * @swagger
 * /api/auth/check:
 *   get:
 *     summary: Current user check
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving questions
 */
router.get("/check", isAuthorized, checkUser);
/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logs out user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving questions
 */
router.get("/logout", isAuthorized, logout);

export { router as authRouter };

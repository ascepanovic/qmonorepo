import express from "express";
import { Request, Response, NextFunction } from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import { findAll } from "../services/user.service";

const router = express.Router();

router.get("/", isAuthorized, async (req: Request, res: Response) => {
  const users = await findAll();
  return res.send(users).status(200);
});

export { router as userRouter };

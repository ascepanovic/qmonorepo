import express from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";

const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/auth", authRouter);

export default routes;

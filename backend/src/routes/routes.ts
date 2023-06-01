import express from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { gameRouter } from "./game.route";
import { answerRouter } from "./answer.route";
import { questionRouter } from "./question.route";
import { categoryRouter } from "./category.route";

const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/auth", authRouter);
routes.use("/game", gameRouter);
routes.use("/answer", answerRouter);
routes.use("/question", questionRouter);
routes.use("/category", categoryRouter);

export default routes;

require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import { userRouter } from "./routes/user.route";
import connectDB from "./utils/prisma";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;
app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_ORIGIN],
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Success!!!",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;

app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_ORIGIN],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

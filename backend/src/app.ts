require("dotenv").config();
import http from "http";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import connectDB from "./utils/prisma";
import routes from "./routes/routes";
import { initializeSocketIO } from "./utils/socket";

const app = express();
const server = new http.Server(app);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "QUIZ APP",
      version: "1.0.0",
      description: "QUIZ APP Documentation",
    },
    components: {
      securitySchemes: {
        AuthCookie: {
          type: "apiKey",
          name: "Cookie",
          in: "cookie",
        },
      },
    },
    security: [
      {
        AuthCookie: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, "./routes/*.ts")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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
app.use("/api", routes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Success!",
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
const ioPort = process.env.IO_PORT || 4000;
app.listen(port, () => {
  console.log(`App started on port: ${port}`);
  connectDB();
});
server.listen(ioPort, () => {
  console.log(`IO-Server started on port: ${ioPort}`);
  initializeSocketIO(server);
});

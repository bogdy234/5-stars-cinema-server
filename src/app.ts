import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import movieRouter from "./controllers/movie";
import userRouter from "./controllers/user";
import hallRouter from "./controllers/hall";
import reservationRouter from "./controllers/reservation";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

function startServer(): void {
  app.listen(port, () => {
    console.log(`Running on port ${port}...`);
  });
}

const db = process.env.CONNECTION_STRING;

async function startDatabase(): Promise<void> {
  if (typeof db !== "string") {
    throw new Error("db connection string not set!");
  }
  try {
    await mongoose.connect(db);
    console.log("MongoDB database connection established successfully");
  } catch (err) {
    console.log(err);
  }
}

function initRouters(): void {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use("/user", userRouter);
  app.use("/movie", movieRouter);
  app.use("/hall", hallRouter);
  app.use("/reservation", reservationRouter);
}

async function run(): Promise<void> {
  startServer();
  try {
    await startDatabase();
  } catch (err) {
    console.log(err);
  }
  initRouters();
}

void run();

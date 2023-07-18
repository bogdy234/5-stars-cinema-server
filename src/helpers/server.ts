import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import userRouter from "../controllers/user";
import movieRouter from "../controllers/movie";
import hallRouter from "../controllers/hall";
import reservationRouter from "../controllers/reservation";
import { logError, returnError } from "../middleware/error";

const app = express();

export function initRouters(): void {
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
    app.use(logError);
    app.use(returnError);
}

export function createServer(): any {
    initRouters();
    return app;
}

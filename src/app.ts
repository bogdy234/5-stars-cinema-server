import mongoose from "mongoose";
import dotenv from "dotenv";

import { createServer } from "./helpers/server";

dotenv.config();

const app = createServer();

const port = process.env.PORT ?? 3000;

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

function startServer(): void {
    app.listen(port, () => {
        console.log(`Running on port ${port}...`);
    });
}

export async function run(): Promise<void> {
    startServer();
    try {
        await startDatabase();
    } catch (err) {
        console.log(err);
    }
    // initRouters();
}

void run();

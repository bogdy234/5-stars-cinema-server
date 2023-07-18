import request from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { createServer } from "../helpers/server";

const app = createServer();
dotenv.config();

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

// afterEach(async () => {
//     const clearDatabase = async (): Promise<void> => {
//         const collections = mongoose.connection.collections;
//         for (const key in collections) {
//             const collection = collections[key];
//             await collection.deleteMany({});
//         }
//     };
//     await clearDatabase();
// });

afterAll(async () => {
    await mongoose.disconnect();
});

let createdHallId: string = "";

describe("Hall Test)", () => {
    describe("POST /hall", () => {
        it("create a hall with a new ID and with a number of 100 seats successfully", async () => {
            const response = await request(app)
                .post("/hall")
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    number: 120,
                    seats: 100,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(100);

            createdHallId = response?.body?._id;
        });

        it("throws an bad request error if a hall is trying to be created without hall number present in the body", async () => {
            const response = await request(app)
                .post("/hall")
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    seats: 100,
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.name).toBe("BadRequestError");
        });

        it("throws an bad request error if a hall is trying to be created without seats present in the body", async () => {
            const response = await request(app)
                .post("/hall")
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    number: 120,
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.name).toBe("BadRequestError");
        });

        it("throws an conflict error if a hall is trying to be created with the same number", async () => {
            const response = await request(app)
                .post("/hall")
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    number: 120,
                    seats: 100,
                });

            expect(response.statusCode).toBe(409);
            expect(response.body.name).toBe("ConflictError");
        });
    });

    describe("GET /hall", () => {
        it("returns correct hall informations if id is provided", async () => {
            const response = await request(app).get(`/hall?id=${createdHallId}`).send();

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(100);
        });

        it("returns correct hall informations if id is provided", async () => {
            const response = await request(app).get(`/hall?id=123412341234`).send();

            expect(response.statusCode).toBe(404);
            expect(response.body.name).toBe("NotFoundError");
        });
    });
});

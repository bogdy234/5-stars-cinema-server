import request from "supertest";
import dotenv from "dotenv";

import { createServer } from "../helpers/server";
import { clearInMemoryMongo, initInMemoryMongo } from "../helpers/testing-mocks";

const app = createServer();
dotenv.config();

beforeAll(async () => {
    await initInMemoryMongo();
});

afterAll(async () => {
    await clearInMemoryMongo();
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
            const response = await request(app).get(`/hall?id=${createdHallId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(100);
        });

        it("throws not found error if provided id is wrong", async () => {
            const response = await request(app).get(`/hall?id=123412341234`);

            expect(response.statusCode).toBe(404);
            expect(response.body.name).toBe("NotFoundError");
        });
    });

    describe("PUT /hall", () => {
        it("returns same updated informations", async () => {
            const response = await request(app)
                .put("/hall")
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    id: createdHallId,
                    updatedValue: {
                        seats: 140,
                    },
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(140);
        });

        it("returns same informations if updated value is not provided", async () => {
            const response = await request(app)
                .put(`/hall`)
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    id: createdHallId,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(140);
        });

        it("throws a not found error if the id provided is not found", async () => {
            const response = await request(app)
                .put(`/hall`)
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "")
                .send({
                    id: "123456123456",
                });

            expect(response.statusCode).toBe(404);
            expect(response.body.name).toBe("NotFoundError");
        });
    });

    describe("GET /hall/read-by-number", () => {
        it("returns a hall data based on number provided", async () => {
            const response = await request(app).get(`/hall/read-by-number?hallNumber=${120}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.number).toBe(120);
            expect(response.body.seats).toBe(140);
        });
    });

    describe("DELETE /hall", () => {
        it("delete with success an entry if correct id is provided", async () => {
            const response = await request(app)
                .delete(`/hall?id=${createdHallId}`)
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "");

            expect(response.statusCode).toBe(200);
            expect(response.body).toBe(`Entry with id ${createdHallId} successfully deleted!`);
        });

        it("throw a not found error if provided id is not found", async () => {
            const response = await request(app)
                .delete(`/hall?id=123456123456`)
                .set("Cookie", process.env.USER_SESSION_COOKIE ?? "");

            expect(response.statusCode).toBe(404);
            expect(response.body.name).toBe("NotFoundError");
        });
    });
});

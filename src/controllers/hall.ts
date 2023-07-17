import { Router } from "express";

import hallService from "../services/hall";
import { onlyAdminsRoute } from "../middleware/user";
import { asyncErrorHandler } from "../middleware/error";
import ConflictError from "../error/conflict";
import NotFoundError from "../error/not-found";

import type { NextFunction, Request, Response } from "express";

const hallRouter = Router();

const createHall = async (req: Request, res: Response): Promise<Response> => {
    const existingHallData = await hallService.readByNumber({
        number: req.body.number,
    });
    if (existingHallData) {
        throw new ConflictError("Hall already exists");
    }
    const data = await hallService.create(req.body);
    if (!data) {
        throw new Error("Hall not created");
    }
    return res.status(200).json(data);
};

const readHall = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        throw new NotFoundError("Invalid hall id");
    }
    const data = await hallService.read(id);
    if (!data) {
        throw new NotFoundError("Hall not found");
    }
    return res.status(200).json(data);
};

const updateHall = async (req: Request, res: Response): Promise<Response> => {
    const { id, updatedValue } = req.body;
    const data = await hallService.update(id, updatedValue);
    if (!data) {
        throw new NotFoundError("Hall not found");
    }
    return res.status(200).json(data);
};

const deleteHall = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        throw new NotFoundError("Invalid hall id");
    }
    const data = await hallService.deleteOne(id);
    return res.status(200).json(data);
};

const getAllHalls = async (req: Request, res: Response): Promise<Response> => {
    const data = await hallService.getAllHalls();
    return res.status(200).json(data);
};

const readByNumber = async (req: Request, res: Response): Promise<Response> => {
    const hallNumber = req.query.hallNumber;
    if (typeof hallNumber !== "string") {
        return res.status(400).json({ message: "Invalid hall number" });
    }
    const data = await hallService.readByNumber({
        number: parseInt(hallNumber),
    });
    if (!data) {
        throw new NotFoundError("Hall not found");
    }
    return res.status(200).json(data);
};

hallRouter.route("").post(onlyAdminsRoute, asyncErrorHandler(createHall));
hallRouter.route("").get(asyncErrorHandler(readHall));
hallRouter.route("").put(onlyAdminsRoute, asyncErrorHandler(updateHall));
hallRouter.route("").delete(onlyAdminsRoute, asyncErrorHandler(deleteHall));

hallRouter.route("/get-all-halls").get(asyncErrorHandler(getAllHalls));
hallRouter.route("/read-by-number").get(asyncErrorHandler(readByNumber));

export default hallRouter;

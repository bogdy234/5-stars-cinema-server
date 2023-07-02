import { Router } from "express";

import hallService from "../services/hall";
import { onlyAdminsRoute } from "../middleware/user";
import { asyncErrorHandler } from "../middleware/error";
import ConflictError from "../error/conflict";

import type { NextFunction, Request, Response } from "express";

const hallRouter = Router();

async function createHall(req: Request, res: Response): Promise<Response> {
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
}

const readHall = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid hall id" });
    }
    const data = await hallService.read(id);
    return res.status(200).json(data);
};

const updateHall = async (req: Request, res: Response): Promise<Response> => {
    const value = req.body;
    const data = await hallService.update(value);
    return res.status(200).json(data);
};

const deleteHall = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid hall id" });
    }
    const data = await hallService.deleteOne(parseInt(id));
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
    return res.status(200).json(data);
};

hallRouter.route("").post(onlyAdminsRoute, asyncErrorHandler(createHall));
hallRouter.route("").get(asyncErrorHandler(readHall));
hallRouter.route("").put(onlyAdminsRoute, asyncErrorHandler(updateHall));
hallRouter.route("").delete(onlyAdminsRoute, asyncErrorHandler(deleteHall));

hallRouter.route("/getAllHalls").get(asyncErrorHandler(getAllHalls));
hallRouter.route("/readByNumber").get(asyncErrorHandler(readByNumber));

export default hallRouter;

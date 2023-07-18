import { Router } from "express";

import movieService from "../services/movie";
import { onlyAdminsRoute } from "../middleware/user";
import BadRequestError from "../error/bad-request";
import NotFoundError from "../error/not-found";
import { asyncErrorHandler } from "../middleware/error";
import ConflictError from "../error/conflict";

import type { Request, Response } from "express";

const movieRouter = Router();

const createMovie = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;
    const existingMovie = await movieService.findByTitle(body.title);
    if (existingMovie) {
        throw new ConflictError("Movie with this title already exists");
    }
    const data = await movieService.create(body);
    if (!data) {
        throw new Error("Movie not created");
    }
    return res.status(201).json(data);
};

const readMovie = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        throw new BadRequestError("Invalid id");
    }
    const data = await movieService.read(id);
    if (!data) {
        throw new NotFoundError("Movie not found");
    }
    return res.status(201).json(data);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    const { id, updatedValue } = req.body;
    const newData = await movieService.update(id, updatedValue);
    if (!newData) {
        throw new NotFoundError("Movie not found");
    }
    return res.status(201).json(newData);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id;
    if (typeof id !== "string") {
        throw new BadRequestError("Invalid id");
    }
    const response = await movieService.deleteOne(id);
    return res.status(201).json(response);
};

const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
    const response = await movieService.getAllMovies();
    return res.status(201).json(response);
};

const findByTitle = async (req: Request, res: Response): Promise<Response> => {
    const title = req.query.title;
    if (typeof title !== "string") {
        throw new BadRequestError("Invalid title");
    }
    const data = await movieService.findByTitle(title);
    if (!data) {
        throw new NotFoundError("Movie not found");
    }
    return res.status(201).json(data);
};

movieRouter.route("").post(onlyAdminsRoute, asyncErrorHandler(createMovie));
movieRouter.route("").get(asyncErrorHandler(readMovie));
movieRouter.route("").put(onlyAdminsRoute, asyncErrorHandler(updateMovie));
movieRouter.route("").delete(onlyAdminsRoute, asyncErrorHandler(deleteMovie));
movieRouter.route("/get-all-movies").get(asyncErrorHandler(getAllMovies));
movieRouter.route("/find-by-title").get(asyncErrorHandler(findByTitle));

export default movieRouter;

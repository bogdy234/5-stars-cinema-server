import { Router, type Request, type Response } from "express";

import movieService from "../services/movie";
import { onlyAdminsRoute } from "../middleware/user";
import { type IMovie } from "../models/movie";

const movieRouter = Router();

function createMovie(req: Request, res: Response): void {
    const value = req.body;

    movieService.create(
        value,
        (data: IMovie) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
}

const readMovie = (req: Request, res: Response): void => {
    const value = req.query;

    movieService.read(
        value,
        (data: IMovie) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const updateMovie = (req: Request, res: Response): void => {
    const value = req.body;

    movieService.update(
        value,
        (data: IMovie) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const deleteMovie = (req: Request, res: Response): void => {
    const value = req.query;

    movieService.delete(
        value,
        () => res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
        (err) => res.status(400).json({ message: err, deleted: false })
    );
};

const getAllMovies = (req: Request, res: Response): void => {
    movieService.getAllMovies(
        (data: IMovie[]) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

movieRouter.route("").post(onlyAdminsRoute, createMovie);
movieRouter.route("").get(readMovie);
movieRouter.route("").put(onlyAdminsRoute, updateMovie);
movieRouter.route("").delete(onlyAdminsRoute, deleteMovie);
movieRouter.route("/getAllMovies").get(getAllMovies);

export default movieRouter;

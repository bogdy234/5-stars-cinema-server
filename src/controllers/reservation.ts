import { Router } from "express";

import reservationService from "../services/reservation";
import { onlyAdminsRoute } from "../middleware/user";

import type { IReservation } from "../models/reservation";
import type { Request, Response } from "express";

const reservationRouter = Router();

function createReservation(req: Request, res: Response): void {
    const value = req.body;

    reservationService.create(
        value,
        (data: IReservation) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
}

const readReservation = (req: Request, res: Response): void => {
    const value = req.query;

    reservationService.read(
        value,
        (data: IReservation) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const updateReservation = (req: Request, res: Response): void => {
    const value = req.body;

    reservationService.update(
        value,
        (data: IReservation) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const deleteReservation = (req: Request, res: Response): void => {
    const value = req.query;

    reservationService.delete(
        value,
        () => res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
        (err) => res.status(400).json({ message: err, deleted: false })
    );
};

const getAllReservations = (req: Request, res: Response): void => {
    reservationService.getAllReservations(
        (data: IReservation[]) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

const getUserReservations = (req: Request, res: Response): void => {
    const item = req.query;

    reservationService.getUserReservations(
        item,
        (data: IReservation) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

const getMovieReservations = (req: Request, res: Response): void => {
    const item = req.body;

    reservationService.getMovieReservations(
        item,
        (data) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

const getReservedSeats = (req: Request, res: Response): void => {
    const item = req.query;

    reservationService.getReservedSeats(
        item,
        (data) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

const findByName = (req: Request, res: Response): void => {
    const item = req.query;

    reservationService.findByName(
        item,
        (data) => {
            res.status(200).json(data);
        },
        (err) => {
            res.status(400).json({ message: err });
        }
    );
};

reservationRouter.route("").post(createReservation);
reservationRouter.route("").get(readReservation);
reservationRouter.route("").put(updateReservation);
reservationRouter.route("").delete(deleteReservation);
reservationRouter.route("/getAllReservations").get(onlyAdminsRoute, getAllReservations);
reservationRouter.route("/getUserReservations").get(getUserReservations);
reservationRouter.route("/getMovieReservations").get(getMovieReservations);
reservationRouter.route("/getReservedSeats").get(getReservedSeats);
reservationRouter.route("/findByName").get(findByName);

export default reservationRouter;

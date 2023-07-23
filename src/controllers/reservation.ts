import { Router } from "express";

import reservationService from "../services/reservation";
import { onlyAdminsRoute } from "../middleware/user";
import BadRequestError from "../error/bad-request";
import NotFoundError from "../error/not-found";

import type { Request, Response } from "express";

const reservationRouter = Router();

const createReservation = async (req: Request, res: Response): Promise<Response> => {
    const newReservation = reservationService.create(req.body);

    // TODO: check if there are any existing reservation for the user to the same movie

    if (!newReservation) {
        throw new Error("Reservation not created");
    }

    return res.status(201).json(newReservation);
};

const readReservation = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id;

    if (typeof id !== "string") {
        throw new BadRequestError("Invalid id");
    }

    const reservation = await reservationService.read(id);

    if (!reservation) {
        throw new NotFoundError("Reservation with provided id not found");
    }

    return res.status(200).json(reservation);
};

const updateReservation = async (req: Request, res: Response): Promise<Response> => {
    const { id, updatedValue } = req.body;

    const updatedReservation = await reservationService.update(id, updatedValue);
    if (!updateReservation) {
        throw new Error("Reservation not updated");
    }

    return res.status(200).json(updatedReservation);
};

const deleteReservation = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new BadRequestError("You provided the wrong data");
    }

    const response = await reservationService.deleteOne(id);

    return res.status(200).json(response);
};

const getAllReservations = async (req: Request, res: Response): Promise<Response> => {
    const reservations = await reservationService.getAllReservations();

    return res.status(200).json(reservations);
};

const getUserReservations = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.query;
    if (typeof userId !== "string") {
        throw new BadRequestError("You provided the wrong data");
    }

    const userReservations = await reservationService.getUserReservations(userId);

    return res.status(200).json(userReservations);
};

const getMovieReservations = async (req: Request, res: Response): Promise<Response> => {
    const { movieId, hallId, movieTiming } = req.body;

    const reservations = await reservationService.getMovieReservations(movieId, hallId, movieTiming);

    return res.status(200).json(reservations);
};

const getReservedSeats = async (req: Request, res: Response): Promise<Response> => {
    const { movieId, hallId, movieTiming } = req.query;

    if (typeof movieId !== "string" || typeof hallId !== "string" || typeof movieTiming !== "string") {
        throw new BadRequestError("You provided the wrong data");
    }
    const reservedSeats = reservationService.getReservedSeats(movieId, hallId, movieTiming);

    return res.status(200).json(reservedSeats);
};

const findByName = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName } = req.query;
    if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw new BadRequestError("You provided the wrong data");
    }

    const reservation = await reservationService.findByName(firstName, lastName);

    return res.status(200).json(reservation);
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

import { ObjectId } from "mongodb";

import ReservationModel, { type IReservation } from "../models/reservation";
import UserModel from "../models/user";
import NotFoundError from "../error/not-found";

const create = async (item: IReservation): Promise<IReservation> => {
    return await ReservationModel.create(item);
};
const read = async (id: string): Promise<IReservation | null> => {
    return await ReservationModel.findById(id);
};
const update = async (id: string, updatedValue: Partial<IReservation>): Promise<IReservation | null> => {
    const filterQuery = { _id: id };

    // options { new: true } to return the updated data intead of old data
    return await ReservationModel.findOneAndUpdate(filterQuery, updatedValue, {
        new: true,
    });
};

const deleteOne = async (id: string): Promise<string> => {
    const query = { _id: id };

    const response = await ReservationModel.deleteOne(query);
    if (response.deletedCount === 0) {
        throw new NotFoundError("Reservation not found");
    }

    return `Entry with id ${id} successfully deleted!`;
};

const getAllReservations = async (): Promise<IReservation[]> => {
    return await ReservationModel.find({});
};

const getUserReservations = async (userId: string): Promise<IReservation | null> => {
    return await ReservationModel.find({ userId }).lean();
};

const getMovieReservations = async (movieId: string, hallId: string, movieTiming: string): Promise<IReservation> => {
    // const { movieId, hallId, movieTiming } = item;
    const filterQuery = {
        movieId: new ObjectId(movieId),
        hallId,
        movieTiming: new Date(movieTiming).toISOString(),
    };

    return await ReservationModel.find(filterQuery).lean();
};

const getReservedSeats = async (
    movieId: string,
    hallId: string,
    movieTiming: string
): Promise<Array<Array<{ row: number; column: number }>>> => {
    // const { movieId, movieTiming, hallId } = item;
    const filterQuery = {
        movieId: new ObjectId(movieId),
        hallId,
        movieTiming: new Date(movieTiming).toISOString(),
    };

    const data = await ReservationModel.find(filterQuery);

    return data.map((d) => d.bookedSeats);
    // .then((data) => {
    //     const newArray: any = [];
    //     data.forEach((entry) => {
    //         newArray.push(entry.bookedSeats);
    //     });
    //     return newArray.flat();
    // })
    // .then((data) => success(data))
    // .catch((error) => fail(error));
};

const findByName = async (firstName: string, lastName: string): Promise<IReservation> => {
    const user = await UserModel.find({ firstName, lastName });
    const userId = user[0]._id;

    return await ReservationModel.find({ userId }).lean();

    //         .then((data) => {
    //     return data;
    // })
    // .then((user) => {
    //     const userId = user[0]._id;
    //     filter = { userId };
    //     ReservationModel.find(filter)
    //         .then((data) => {
    //             success(data);
    //         })
    //         .catch((error) => fail(error));
    // })
    // .catch((error) => fail(error));
};

export default {
    create,
    read,
    update,
    deleteOne,
    getAllReservations,
    getReservedSeats,
    findByName,
    getMovieReservations,
    getUserReservations,
};

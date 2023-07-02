import { ObjectId } from "mongodb";

import ReservationModel from "../models/reservation";
import UserModel from "../models/user";

const ReservationService = {
    create: (item, success, fail) => {
        ReservationModel.create(item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    read: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        ReservationModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    update: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        // options { new: true } to return the updated data intead of old data
        ReservationModel.findOneAndUpdate(filterQuery, item.updatedValue, {
            new: true,
        })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    delete: (item, success, fail) => {
        const query = { _id: item.id };

        ReservationModel.deleteOne(query, item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getAllReservations: (success, fail) => {
        ReservationModel.find({})
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getUserReservations: (item, success, fail) => {
        const { userId } = item;
        const filterQuery = { userId: new ObjectId(userId) };

        ReservationModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getMovieReservations: (item, success, fail) => {
        const { movieId, hallId, movieTiming } = item;
        const filterQuery = {
            movieId: new ObjectId(movieId),
            hallId,
            movieTiming: new Date(movieTiming).toISOString(),
        };

        ReservationModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getReservedSeats: (item, success, fail) => {
        const { movieId, movieTiming, hallId } = item;
        const filterQuery = {
            movieId: new ObjectId(movieId),
            hallId,
            movieTiming: new Date(movieTiming).toISOString(),
        };

        ReservationModel.find(filterQuery)
            .then((data) => {
                const newArray: any = [];
                data.forEach((entry) => {
                    newArray.push(entry.bookedSeats);
                });
                return newArray.flat();
            })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    findByName: (item, success, fail) => {
        let filter = { firstName: item.firstName, lastName: item.lastName } as any;
        UserModel.find(filter)
            .then((data) => {
                return data;
            })
            .then((user) => {
                const userId = user[0]._id;
                filter = { userId };
                ReservationModel.find(filter)
                    .then((data) => {
                        success(data);
                    })
                    .catch((error) => fail(error));
            })
            .catch((error) => fail(error));
    },
};

export default ReservationService;

const ReservationModel = require("../models/reservation");
const { ObjectId } = require("mongodb");

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
        const filterQuery = { userId: ObjectId(userId) };

        ReservationModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getMovieReservations: (item, success, fail) => {
        const { movieId, hallId, movieTiming } = item;
        const filterQuery = {
            movieId: ObjectId(movieId),
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
            movieId: ObjectId(movieId),
            hallId,
            movieTiming: new Date(movieTiming).toISOString(),
        };

        ReservationModel.find(filterQuery)
            .then((data) => {
                const newArray = [];
                data.map((entry) => {
                    newArray.push(entry.bookedSeats);
                });
                return newArray.flat();
            })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
};

module.exports = ReservationService;

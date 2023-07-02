import MovieModel from "../models/movie";

const MovieService = {
    create: (item, success, fail) => {
        MovieModel.create(item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    read: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        MovieModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    update: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        // options { new: true } to return the updated data intead of old data
        MovieModel.findOneAndUpdate(filterQuery, item.updatedValue, {
            new: true,
        })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    delete: (item, success, fail) => {
        const query = { _id: item.id };

        MovieModel.deleteOne(query, item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getAllMovies: (success, fail) => {
        MovieModel.find({})
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
};

export default MovieService;

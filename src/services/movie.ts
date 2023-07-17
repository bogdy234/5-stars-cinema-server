import NotFoundError from "../error/not-found";
import MovieModel from "../models/movie";

import type { IMovie } from "../models/movie";

const create = async (item: IMovie): Promise<IMovie> => {
    const data = await MovieModel.create(item);
    return data;
};

const read = async (id: string): Promise<IMovie | null> => {
    const data = await MovieModel.findById(id);
    return data;
};

const update = async (id: string, updatedValue: IMovie): Promise<IMovie | null> => {
    const filterQuery = { _id: id };
    // options { new: true } to return the updated data intead of old data
    const newData = await MovieModel.findOneAndUpdate(filterQuery, updatedValue, {
        new: true,
    });
    return newData;
};

const deleteOne = async (id: string): Promise<string> => {
    const query = { _id: id };
    const response = await MovieModel.deleteOne(query);
    if (response.deletedCount === 0) {
        throw new NotFoundError("Movie not found");
    }
    return `Entry with id ${id} successfully deleted!`;
};

const getAllMovies = async (): Promise<IMovie[]> => {
    const movies = await MovieModel.find({});
    return movies ?? [];
};

const findByTitle = async (title: string): Promise<IMovie | null> => {
    const data = await MovieModel.findOne({ title });
    return data;
};

export default { create, read, update, deleteOne, getAllMovies, findByTitle };

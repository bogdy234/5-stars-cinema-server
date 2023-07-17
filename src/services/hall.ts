import HallModel from "../models/hall";
import { type PromiseIServiceResponse } from "../types";
import NotFoundError from "../error/not-found";

import type { IHall } from "../models/hall";

const create = async (item: IHall): Promise<IHall> => {
    const data = await HallModel.create(item);
    return data;
};

const read = async (id: string): Promise<IHall | null> => {
    const data = await HallModel.findById(id);
    return data;
};

const update = async (id: number, updatedValue: Partial<IHall>): Promise<IHall | null> => {
    // options { new: true } to return the updated data intead of old data
    const data = await HallModel.findOneAndUpdate({ _id: id }, updatedValue, {
        new: true,
    });
    return data;
};

const deleteOne = async (id: string): Promise<string> => {
    const response = await HallModel.deleteOne({ _id: id });
    if (response.deletedCount === 0) {
        throw new NotFoundError("Hall not found");
    }
    return `Entry with id ${id} successfully deleted!`;
};

const getAllHalls = async (): PromiseIServiceResponse<IHall[]> => {
    const response = await HallModel.find({});
    return { data: response };
};

const readByNumber = async (item: { number: number }): Promise<IHall | null> => {
    const filterQuery = { number: item.number };
    const data = await HallModel.findOne(filterQuery);
    return data;
};

export default { create, read, update, deleteOne, getAllHalls, readByNumber };

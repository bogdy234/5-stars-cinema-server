import HallModel from "../models/hall";

import type { IHall } from "../models/hall";

const create = (item: IHall, success, fail): void => {
  HallModel.create(item)
    .then((data) => success(data))
    .catch((error) => fail(error));
};
const read = (item, success, fail): void => {
  const filterQuery = { _id: item.id };

  HallModel.find(filterQuery)
    .then((data) => success(data))
    .catch((error) => fail(error));
};
const update = (item, success, fail): void => {
  const filterQuery = { _id: item.id };

  // options { new: true } to return the updated data intead of old data
  HallModel.findOneAndUpdate(filterQuery, item.updatedValue, {
    new: true,
  })
    .then((data) => success(data))
    .catch((error) => fail(error));
};
const deleteOne = (item, success, fail): void => {
  const query = { _id: item.id };

  HallModel.deleteOne(query, item)
    .then((data) => success(data))
    .catch((error) => fail(error));
};
const getAllHalls = (success, fail): void => {
  HallModel.find({})
    .then((data) => success(data))
    .catch((error) => fail(error));
};
const readByNumber = (item, success, fail): void => {
  const filterQuery = { number: item.number };

  HallModel.find(filterQuery)
    .then((data) => success(data))
    .catch((error) => fail(error));
};

export default { create, read, update, deleteOne, getAllHalls, readByNumber };

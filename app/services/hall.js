const HallModel = require("../models/hall");

const HallService = {
    create: (item, success, fail) => {
        HallModel.create(item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    read: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        HallModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    update: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        // options { new: true } to return the updated data intead of old data
        HallModel.findOneAndUpdate(filterQuery, item.updatedValue, {
            new: true,
        })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    delete: (item, success, fail) => {
        const query = { _id: item.id };

        HallModel.deleteOne(query, item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    getAllHalls: (success, fail) => {
        HallModel.find({})
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
};

module.exports = HallService;

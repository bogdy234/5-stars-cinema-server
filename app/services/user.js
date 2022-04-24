const UserModel = require("../models/user");
const userHelpers = require("../helpers/user");
const bcrypt = require("bcrypt");

const UserService = {
    create: async (item, success, fail) => {
        item.password = await userHelpers.hashPasswordAsync(item.password);

        UserModel.create(item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    read: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        UserModel.find(filterQuery)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    update: (item, success, fail) => {
        const filterQuery = { _id: item.id };

        // options { new: true } to return the updated data intead of old data
        UserModel.findOneAndUpdate(filterQuery, item.updatedValue, {
            new: true,
        })
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    delete: (item, success, fail) => {
        const query = { _id: item.id };

        UserModel.deleteOne(query, item)
            .then((data) => success(data))
            .catch((error) => fail(error));
    },
    login: (item, success, fail) => {
        const query = { email: item.email };

        UserModel.findOne(query)
            .then(async (data) => {
                if (data) {
                    const cmp = await bcrypt.compare(
                        item.password,
                        data.password
                    );
                    if (cmp) {
                        const { password, ...returnData } = data._doc;

                        success(returnData);
                    } else {
                        throw Error("Wrong username or password.");
                    }
                } else {
                    throw Error("No data");
                }
            })
            .catch((err) => fail(err));
    },
    sendContactEmail: (item, success, fail) => {
        userHelpers
            .sendEmail(item.name, item.email, item.subject, item.message)
            .then((r) => {
                console.log(r);
                if (r.includes("sent")) {
                    success();
                } else {
                    fail();
                }
            });
    },
};

module.exports = UserService;

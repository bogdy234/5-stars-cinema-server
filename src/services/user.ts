import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user";
import userHelpers from "../helpers/user";
import helpers from "../helpers/index";

const UserService = {
  create: async (item, success, fail) => {
    try {
      item.password = await userHelpers.hashPasswordAsync(item.password);
    } catch (err) {
      console.log(err);
    }

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
        if (data !== undefined && data !== null) {
          const cmp = await bcrypt.compare(item.password, data.password);
          if (cmp) {
            if (data._doc === undefined) {
              return;
            }
            const { password, ...returnData } = data._doc;
            const tokenProps = helpers.removeProperties(returnData, [
              "cardNumber",
              "phoneNumber",
            ]);
            const token = jwt.sign(tokenProps, process.env.JWT_SECRET ?? "");

            success(returnData, token);
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
        success();
      })
      .catch((err) => fail(err));
  },
  findByName: (item, success, fail) => {
    const filter = { firstName: item.firstName, lastName: item.lastName };
    UserModel.find(filter)
      .then((data) => success(data))
      .catch((err) => fail(err));
  },
};

export default UserService;

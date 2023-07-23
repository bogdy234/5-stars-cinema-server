import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel, { type IUser } from "../models/user";
import userHelpers from "../helpers/user";
import helpers from "../helpers/index";
import NotFoundError from "../error/not-found";

const create = async (userData: { email: string; password: string }): Promise<IUser> => {
    userData.password = await userHelpers.hashPasswordAsync(userData.password);

    return await UserModel.create(userData);
};

const read = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
};

const update = async (id: string, updatedValue: Partial<IUser>): Promise<IUser | null> => {
    // options { new: true } to return the updated data intead of old data
    return await UserModel.findByIdAndUpdate(id, updatedValue, {
        new: true,
    });
};

const deleteOne = async (id: string): Promise<string> => {
    const response = await UserModel.deleteOne({ _id: id });

    if (response.deletedCount === 0) {
        throw new NotFoundError("User not found");
    }

    return `User with id ${id} deleted`;
};

const login = async (email: string, password: string): Promise<{ user: IUser | null; token: string | null }> => {
    const fallbackData = { user: null, token: null };

    const user = await UserModel.findOne({ email });
    if (!user) return fallbackData;

    const cmp = await bcrypt.compare(password, user.password);
    if (!cmp) return fallbackData;

    if (user._doc === undefined) {
        return fallbackData;
    }
    // TODO: improve typing
    const returnData: any = user._doc;
    const tokenProps = helpers.removeProperties(returnData, ["cardNumber", "phoneNumber", "password"]);
    const token = jwt.sign(tokenProps, process.env.JWT_SECRET ?? "");
    return { user, token };
};

export default { create, read, update, deleteOne, login };

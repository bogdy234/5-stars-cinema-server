import { Router, type Request, type Response } from "express";

import userHelpers from "../helpers/user";
import userService from "../services/user";
import { removeProperties } from "../helpers";
import { IUser } from "../models/user";

const userRouter = Router();

// const createUser = async (req: Request, res: Response): Promise<Response> => {
//     const value = req.body;

//     const user = userService.create(value);

//     return res.status(200).json(user);
// };

// const readUser = (req: Request, res: Response): void => {
//     const value = req.query;

//     userService.read(value);
// };

// const updateUser = async (req: Request, res: Response): Promise<void> => {
//     let value = req.body;

//     const updatedPassword: string | undefined = value.updatedValue.password;
//     if (updatedPassword !== undefined) {
//         value = {
//             ...value,
//             updatedValue: {
//                 ...value.updatedValue,
//                 password: await userHelpers.hashPasswordAsync(updatedPassword),
//             },
//         };
//     }

//     userService.update(value);
// };

// const deleteUser = (req: Request, res: Response): void => {
//     const value = req.query;

//     userService.delete(
//         value,
//         () => res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
//         (err) => res.status(400).json({ message: err, deleted: false })
//     );
// };

const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const { user, token } = await userService.login(email, password);

    return res
        .cookie("user_session", token, {
            maxAge: 900000,
            httpOnly: true,
        })
        .status(200)
        .json({
            message: user ? "Login Success! Redirecting..." : "Login failed!",
            user,
        });
};

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const value = req.body;

    const { password, ...userDataWithoutPass } = await userService.create(value);

    return res.status(200).json(userDataWithoutPass);
};

// const sendContactEmail = (req: Request, res: Response): void => {
//     const value = req.body;

//     userService.sendContactEmail(
//         value,
//         () => res.status(200).json({ message: "Message sent!", valid: true }),
//         () => res.status(400).json({ message: "Some error occurred...", valid: false })
//     );
// };

// const findByName = (req: Request, res: Response): void => {
//     const value = req.query;

//     userService.findByName(value);
// };

// userRouter.route("").post(createUser);
// userRouter.route("").get(readUser);
// userRouter.route("").put((req, res) => {
//     void updateUser(req, res);
// });
// userRouter.route("").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
// userRouter.route("/contact").post(sendContactEmail);
// userRouter.route("/findByName").post(findByName);

export default userRouter;

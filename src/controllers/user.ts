import { Router, type Request, type Response } from "express";

import userHelpers from "../helpers/user";
import userService from "../services/user";

const userRouter = Router();

function createUser(req: Request, res: Response): void {
    const value = req.body;

    void userService.create(
        value,
        (data) => res.status(200).json(data),
        (error) => res.status(400).json(error)
    );
}

const readUser = (req: Request, res: Response): void => {
    const value = req.query;

    userService.read(
        value,
        (data) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    let value = req.body;

    const updatedPassword: string | undefined = value.updatedValue.password;
    if (updatedPassword !== undefined) {
        value = {
            ...value,
            updatedValue: {
                ...value.updatedValue,
                password: await userHelpers.hashPasswordAsync(updatedPassword),
            },
        };
    }

    userService.update(
        value,
        (data) => res.status(200).json(data),
        (err) => res.status(400).json(err)
    );
};

const deleteUser = (req: Request, res: Response): void => {
    const value = req.query;

    userService.delete(
        value,
        () => res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
        (err) => res.status(400).json({ message: err, deleted: false })
    );
};

const loginUser = (req: Request, res: Response): void => {
    const value = req.body;

    userService.login(
        value,
        (data, token) =>
            res
                .cookie("user_session", token, {
                    maxAge: 900000,
                    httpOnly: true,
                })
                .status(200)
                .json({
                    message: data !== undefined ? "Login Success! Redirecting..." : "Login failed!",
                    valid: true,
                    data,
                }),
        (error) =>
            res.status(400).json({
                message: "Incorrect username or password.",
                valid: false,
                error,
            })
    );
};

const registerUser = (req: Request, res: Response): void => {
    const value = req.body;

    void userService.create(
        value,
        () => res.status(200).json({ message: "Register successfully!", valid: true }),
        (error) =>
            res.status(400).json({
                message: "Registration failed! Please try again later.",
                valid: false,
                error,
            })
    );
};

const sendContactEmail = (req: Request, res: Response): void => {
    const value = req.body;

    userService.sendContactEmail(
        value,
        () => res.status(200).json({ message: "Message sent!", valid: true }),
        () => res.status(400).json({ message: "Some error occurred...", valid: false })
    );
};

const findByName = (req: Request, res: Response): void => {
    const value = req.query;

    userService.findByName(
        value,
        (data) => res.status(200).json(data),
        (err) => res.status(401).json(err)
    );
};

userRouter.route("").post(createUser);
userRouter.route("").get(readUser);
userRouter.route("").put((req, res) => {
    void updateUser(req, res);
});
userRouter.route("").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/contact").post(sendContactEmail);
userRouter.route("/findByName").post(findByName);

export default userRouter;

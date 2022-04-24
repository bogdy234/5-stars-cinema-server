const express = require("express");
const userService = require("../services/user");

const userRouter = express.Router();

function createUser(req, res) {
    const value = req.body;

    userService.create(
        value,
        (data) => res.status(201).json(data),
        (error) => res.status(400).json(error)
    );
}

const readUser = (req, res) => {
    const value = req.query;

    userService.read(
        value,
        (data) => res.status(201).json(data),
        (err) => res.status(400).json(err)
    );
};

const updateUser = (req, res) => {
    const value = req.body;

    userService.update(
        value,
        (data) => res.status(201).json(data),
        (err) => res.status(400).json(err)
    );
};

const deleteUser = (req, res) => {
    const value = req.query;

    userService.delete(
        value,
        () =>
            res
                .status(201)
                .json({ message: "Successfully Deleted!", deleted: true }),
        (err) => res.status(400).json({ message: err, deleted: false })
    );
};

const loginUser = (req, res) => {
    const value = req.body;

    userService.login(
        value,
        (data) =>
            res.status(201).json({
                message: data
                    ? "Login Success! Redirecting..."
                    : "Login failed!",
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

const registerUser = (req, res) => {
    const value = req.body;

    userService.create(
        value,
        () =>
            res
                .status(201)
                .json({ message: "Register successfully!", valid: true }),
        (error) =>
            res.status(400).json({
                message: "Registration failed! Please try again later.",
                valid: false,
                error,
            })
    );
};

const sendContactEmail = (req, res) => {
    const value = req.body;

    userService.sendContactEmail(
        value,
        () => res.status(201).json({ message: "Message sent!", valid: true }),
        () =>
            res
                .status(400)
                .json({ message: "Some error occurred...", valid: false })
    );
};

userRouter.route("").post(createUser);
userRouter.route("").get(readUser);
userRouter.route("").put(updateUser);
userRouter.route("").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/contact").post(sendContactEmail);

module.exports = userRouter;

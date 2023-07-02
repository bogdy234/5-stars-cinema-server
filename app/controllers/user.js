const express = require("express");
const userHelpers = require("../helpers/user");
const userService = require("../services/user");

const userRouter = express.Router();

function createUser(req, res) {
  const value = req.body;

  userService.create(
    value,
    (data) => res.status(200).json(data),
    (error) => res.status(400).json(error)
  );
}

const readUser = (req, res) => {
  const value = req.query;

  userService.read(
    value,
    (data) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const updateUser = async (req, res) => {
  let value = req.body;
  if (value.updatedValue.password) {
    value = {
      ...value,
      updatedValue: {
        ...value.updatedValue,
        password: await userHelpers.hashPasswordAsync(
          value.updatedValue.password
        ),
      },
    };
  }

  userService.update(
    value,
    (data) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const deleteUser = (req, res) => {
  const value = req.query;

  userService.delete(
    value,
    () =>
      res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
    (err) => res.status(400).json({ message: err, deleted: false })
  );
};

const loginUser = (req, res) => {
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
          message: data ? "Login Success! Redirecting..." : "Login failed!",
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
      res.status(200).json({ message: "Register successfully!", valid: true }),
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
    () => res.status(200).json({ message: "Message sent!", valid: true }),
    () =>
      res.status(400).json({ message: "Some error occurred...", valid: false })
  );
};

const findByName = () => {
  const value = req.query;

  userService.findUserByName(
    value,
    (data) => res.status(200).json(data),
    (err) => res.status(401).json(err)
  );
};

userRouter.route("").post(createUser);
userRouter.route("").get(readUser);
userRouter.route("").put(updateUser);
userRouter.route("").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/contact").post(sendContactEmail);
userRouter.route("/findByName").post(findByName);

module.exports = userRouter;

const express = require("express");
const hallService = require("../services/hall");
const { onlyAdminsRoute } = require("../middleware/user");

const hallRouter = express.Router();

function createHall(request, response) {
  const value = request.body;
  hallService.create(
    value,
    (data) => response.status(201).json(data),
    (err) => response.status(400).json(err)
  );
}

const readHall = (req, res) => {
  const value = req.query;

  hallService.read(
    value,
    (data) => res.status(201).json(data),
    (err) => res.status(400).json(err)
  );
};

const updateHall = (req, res) => {
  const value = req.body;

  hallService.update(
    value,
    (data) => res.status(201).json(data),
    (err) => res.status(400).json(err)
  );
};

const deleteHall = (req, res) => {
  const value = req.query;

  hallService.delete(
    value,
    () =>
      res.status(201).json({ message: "Successfully Deleted!", deleted: true }),
    (err) => res.status(400).json({ message: err, deleted: false })
  );
};

const getAllHalls = (req, res) => {
  hallService.getAllHalls(
    (data) => {
      res.status(201).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

const readByNumber = (req, res) => {
  const value = req.query;

  hallService.readByNumber(
    value,
    (data) => res.status(201).json(data),
    (err) => res.status(400).json(err)
  );
};

hallRouter.route("").post(onlyAdminsRoute, createHall);
hallRouter.route("").get(readHall);
hallRouter.route("").put(onlyAdminsRoute, updateHall);
hallRouter.route("").delete(onlyAdminsRoute, deleteHall);
hallRouter.route("/getAllHalls").get(getAllHalls);
hallRouter.route("/readByNumber").get(readByNumber);

module.exports = hallRouter;

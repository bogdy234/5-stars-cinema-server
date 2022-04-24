const express = require("express");
const reservationService = require("../services/reservation");

const reservationRouter = express.Router();

function createReservation(request, response) {
  const value = request.body;

  reservationService.create(
    value,
    (data) => response.status(201).json(data),
    (err) => response.status(400).json(err)
  );
}

const readReservation = (req, res) => {
  const value = req.query;

  reservationService.read(
    value,
    (data) => res.status(201).json(data),
    (err) => res.status(400).json(err)
  );
};

const updateReservation = (req, res) => {
  const value = req.body;

  reservationService.update(
    value,
    (data) => res.status(201).json(data),
    (err) => res.status(400).json(err)
  );
};

const deleteReservation = (req, res) => {
  const value = req.query;

  reservationService.delete(
    value,
    () =>
      res.status(201).json({ message: "Successfully Deleted!", deleted: true }),
    (err) => res.status(400).json({ message: err, deleted: false })
  );
};

const getAllReservations = (req, res) => {
  reservationService.getAllReservations(
    (data) => {
      res.status(201).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

const getUserReservations = (req, res) => {
  const item = req.query;

  reservationService.getUserReservations(
    item,
    (data) => {
      res.status(201).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

const getMovieReservations = (req, res) => {
  const item = req.body;

  reservationService.getMovieReservations(
    item,
    (data) => {
      res.status(201).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

const getReservedSeats = (req, res) => {
  const item = req.query;

  reservationService.getReservedSeats(
    item,
    (data) => {
      res.status(201).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

reservationRouter.route("").post(createReservation);
reservationRouter.route("").get(readReservation);
reservationRouter.route("").put(updateReservation);
reservationRouter.route("").delete(deleteReservation);
reservationRouter.route("/getAllReservations").get(getAllReservations);
reservationRouter.route("/getUserReservations").get(getUserReservations);
reservationRouter.route("/getMovieReservations").get(getMovieReservations);
reservationRouter.route("/getReservedSeats").get(getReservedSeats);

module.exports = reservationRouter;

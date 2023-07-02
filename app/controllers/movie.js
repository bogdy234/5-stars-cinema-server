const express = require("express");
const movieService = require("../services/movie");
const { onlyAdminsRoute } = require("../middleware/user");

const movieRouter = express.Router();

function createMovie(request, response) {
  const value = request.body;

  movieService.create(
    value,
    (data) => response.status(200).json(data),
    (err) => response.status(400).json(err)
  );
}

const readMovie = (req, res) => {
  const value = req.query;

  movieService.read(
    value,
    (data) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const updateMovie = (req, res) => {
  const value = req.body;

  movieService.update(
    value,
    (data) => res.status(200).json(data),
    (err) => res.status(400).json(err)
  );
};

const deleteMovie = (req, res) => {
  const value = req.query;

  movieService.delete(
    value,
    () =>
      res.status(200).json({ message: "Successfully Deleted!", deleted: true }),
    (err) => res.status(400).json({ message: err, deleted: false })
  );
};

const getAllMovies = (req, res) => {
  movieService.getAllMovies(
    (data) => {
      res.status(200).json(data);
    },
    (err) => {
      res.status(400).json({ message: err });
    }
  );
};

movieRouter.route("").post(onlyAdminsRoute, createMovie);
movieRouter.route("").get(readMovie);
movieRouter.route("").put(onlyAdminsRoute, updateMovie);
movieRouter.route("").delete(onlyAdminsRoute, deleteMovie);
movieRouter.route("/getAllMovies").get(getAllMovies);

module.exports = movieRouter;

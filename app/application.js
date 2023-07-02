const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./controllers/movie");
const userRouter = require("./controllers/user");
const hallRouter = require("./controllers/hall");
const reservationRouter = require("./controllers/reservation");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

function startServer() {
  app.listen(port, () => console.log(`Running on port ${port}...`));
}

const db = process.env.CONNECTION_STRING;

function startDatabase() {
  mongoose.connect(db, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("MongoDB database connection established successfully");
  });
}

function initRouters() {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use("/user", userRouter);
  app.use("/movie", movieRouter);
  app.use("/hall", hallRouter);
  app.use("/reservation", reservationRouter);
}

(function run() {
  startServer();
  startDatabase();
  initRouters();
})();

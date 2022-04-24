const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  bookedSeats: [{ row: Number, column: Number }],
  ticketsType: { normal: Number, reduced: Number },
  movieTiming: Date,
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: "Hall" },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;

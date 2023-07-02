import { Schema, model } from "mongoose";

import type { Document, ObjectId } from "mongoose";

export interface IReservation {
  userId: ObjectId;
  movieId: ObjectId;
  bookedSeats: Array<{ row: number; column: number }>;
  ticketsType: { normal: number; reduced: number };
  movieTiming: Date;
  hallId: ObjectId;
  hallNumber: number;
  movieName: string;
  totalPrice: number;
  createdAt: Date;
  modifiedAt: Date;
}

const reservationSchema = new Schema<IReservation & Document>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  movieId: { type: Schema.Types.ObjectId, ref: "Movie" },
  bookedSeats: [{ row: Number, column: Number }],
  ticketsType: { normal: Number, reduced: Number },
  movieTiming: Date,
  hallId: { type: Schema.Types.ObjectId, ref: "Hall" },
  hallNumber: Number,
  movieName: String,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Reservation = model<IReservation & Document>(
  "Reservation",
  reservationSchema
);

export default Reservation;

import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export interface IMovie {
  title: string;
  description: string;
  length: number;
  isRunning: boolean;
  coverImageUrl: string;
  trailerUrl: string;
  rating: number;
  genre: string;
  productionYear: number;
  producer: string;
  direction: string;
  actors: string;
  is3D: boolean;
  isPremiere: boolean;
  runningTimes: [
    {
      time: Date;
      hallId: Schema.Types.ObjectId;
    }
  ];
  createdAt: Date;
  modifiedAt: Date;
}

const movieSchema = new Schema<IMovie & Document>({
  title: String,
  description: String,
  length: Number,
  isRunning: Boolean,
  coverImageUrl: String,
  trailerUrl: String,
  // TODO: put restriction to be from 1-10 rating.
  rating: Number,
  genre: String,
  productionYear: Number,
  producer: String,
  direction: String,
  actors: String,
  is3D: Boolean,
  isPremiere: Boolean,
  runningTimes: [
    {
      time: Date,
      hallId: { type: Schema.Types.ObjectId, ref: "Hall" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Movie = model<IMovie & Document>("Movie", movieSchema);

export default Movie;

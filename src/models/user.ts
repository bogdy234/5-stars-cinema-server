import { Schema, model } from "mongoose";

import type { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: Date;
  modifiedAt: Date;
  _doc?: IUser;
}

const userSchema = new Schema<IUser & Document>({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const User = model<IUser & Document>("User", userSchema);

export default User;

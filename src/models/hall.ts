import { model, Schema } from "mongoose";

// import type { Document } from "mongoose";

export interface IHall {
    id: Schema.Types.ObjectId;
    number: number;
    rows: number;
    columns: number;
    seats: number;
    createdAt: Date;
    modifiedAt: Date;
}

const hallSchema = new Schema<IHall>({
    number: Number,
    rows: Number,
    columns: Number,
    seats: {
        type: Number,
        default: function () {
            return this.rows * this.columns;
        },
    },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Hall = model<IHall>("Hall", hallSchema);

export default Hall;

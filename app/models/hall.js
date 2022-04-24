const mongoose = require("mongoose");
const {Schema} = mongoose;

const hallSchema = new Schema({
    number: Number,
    rows: Number,
    columns: Number,
    seats: {
        type: Number,
        default: function () {
            return this.rows * this.columns
        }
    },
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},
});

const Hall = mongoose.model("Hall", hallSchema);

module.exports = Hall;

const mongoose = require("mongoose");

const shortNER = new mongoose.Schema({
    original: { type: String },
    created: { type: String },

}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("shortNER", shortNER);
module.exports = mongoose.model("shortNER");
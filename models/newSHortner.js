const mongoose = require("mongoose");

const shortNER = new mongoose.Schema({
    original: { type: String },
    created: { type: String },
    expire_at: {type: Date, default: Date.now, expires: 60*60*24} 
}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("shortNER", shortNER);
module.exports = mongoose.model("shortNER");
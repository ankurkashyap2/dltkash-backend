const mongoose = require("mongoose");

const ErrorLogs = new mongoose.Schema({
    stack: { type: String },
    error_message: { type: String },
    error_detail: { type: String },
    error_data: { type: String },
    api_path: { type: String },

}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("ErrorLogs", ErrorLogs);
module.exports = mongoose.model("ErrorLogs");
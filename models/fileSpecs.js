const mongoose = require("mongoose");
const { NOTIFICATION_TEMPLATES_TYPES, STATUS } = require("../constants");
const RecordFile = new mongoose.Schema({
    fileName: { type: String },
    status: { type: String, enum: ['UNPROCESSED', 'PROCESSING', 'PROCESSED'] }

}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("RecordFile", RecordFile);
module.exports = mongoose.model("RecordFile");
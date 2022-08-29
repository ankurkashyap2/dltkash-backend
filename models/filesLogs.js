const mongoose = require("mongoose");

const FilesLogs = new mongoose.Schema({
    filesProcessToday: { type: Array, default: [] }

});
mongoose.model("FilesLogs", FilesLogs);
module.exports = mongoose.model("FilesLogs");
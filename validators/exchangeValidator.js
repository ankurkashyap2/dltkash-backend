const { Types } = require("mongoose");
const validator = require("./validator");

const exchangeApiPathModels = {
    "/send-data": {},
    "/files-status": {},
    "/search": {
        mobileNumber: { type: String, required: false },
        TmName: { type: String, required: false },
        panNumber: { type: String, required: false },
        notificationKey: { type: String, required: false }
    }
};

module.exports = function handler(req, res, next) {
    if (!exchangeApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, exchangeApiPathModels[req.path]);
};
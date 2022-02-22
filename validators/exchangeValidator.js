const { Types } = require("mongoose");
const validator = require("./validator");

const exchangeApiPathModels = {
    "/send-data": {},
    "/files-status":{}
};

module.exports = function handler(req, res, next) {
    if (!exchangeApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, exchangeApiPathModels[req.path]);
};
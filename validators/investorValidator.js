const { Types } = require("mongoose");
const validator = require("./validator");

const investorApiPathModels = {
    "/send-verification/email": {
        email: { type: String, required: true, source: "query" },
    },
    "/verify/email": {
        status: { type: String, required: true, source: "query" },
    }
};

module.exports = function handler(req, res, next) {
    if (!investorApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, investorApiPathModels[req.path]);
};
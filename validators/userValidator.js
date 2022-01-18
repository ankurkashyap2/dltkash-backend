const { Types } = require("mongoose");
const validator = require("./validator");

const userApiPathModels = {
    "/register-exchange": {
        legalEntityName: { type: String },
        sebiCertificateNumber: { type: String },
        cinNumber: { type: String },
        panNumber: { type: String },
    },
    "/get-exchange": {
        exchangeId: { type: String, required: true, source: "query" }
    },
    "/get-admin": {
     
    },
    "/logout":{}


};

module.exports = function handler(req, res, next) {
    if (!userApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, userApiPathModels[req.path]);
};
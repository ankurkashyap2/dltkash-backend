const { Types } = require("mongoose");
const validator = require("./validator");

const investorApiPathModels = {

    '/fetchInvestors':{
        from: { type: String, },
        to: { type: String, },
        pageSize: { type: String, },
        bookmark: { type: String, }

    },
    
};

module.exports = function handler(req, res, next) {

    if (!investorApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, investorApiPathModels[req.path]);
};
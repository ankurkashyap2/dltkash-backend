const { Types } = require("mongoose");
const validator = require("./validator");

const investorApiPathModels = {
    "/send-verification/email": {
        email: { type: String, required: true, source: "query" },
    },
    "/verify/email": {
        status: { type: String, required: true, source: "query" },
    },
    "/verify/mobile": {
        status: { type: String, required: true, source: "query" },
    },
    "/get-data": {
        uccRequestId: { type: String, required: true }
    },
    "/create-investor": {
        uccRequestId: { type: String, required: true, },
        uccTmId: { type: String, required: true, },
        uccTmName: { type: String, required: true, },
        uccPanExempt: { type: String, required: true, },
        uccPanNo: { type: String, required: true, },
        uccCountry: { type: String, required: true, },
        uccMobileNo: { type: String, required: true, },
        uccEmailId: { type: String, required: true, },
        uccMobileNoModified: { type: String, required: true, },
        uccEmailIdModified: { type: String, required: true, },
        uccDpId: { type: String, required: true, },
        uccClientId: { type: String, required: true, },
        uccInvestorCode: { type: String, required: true, },
        uccRequestType: { type: String, required: true, },
        uccNodeStatus: { type: String, required: true, },
        uccEmailStatus: { type: String, required: true, },
        uccMobileStatus: { type: String, required: true, },
        uccPanStatus: { type: String, required: true, },
    }
};

module.exports = function handler(req, res, next) {
    if (!investorApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, investorApiPathModels[req.path]);
};
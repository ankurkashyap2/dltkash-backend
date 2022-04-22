const { Types } = require("mongoose");
const validator = require("./validator");

const investorApiPathModels = {
    "/send-verification/email": {
        email: { type: String, required: true, source: "query" },
    },
    "/verify/email": {
        uccRequestId : { type: String, required: true },
        uccEmailStatus:{ type: String, required: true },
    },
    "/verify/mobile": {
        uccRequestId : { type: String, required: true },
        uccMobileStatus:{ type: String, required: true },
    },
    "/get-data": {
        uccRequestId: { type: String, required: true }
    },
    "/bulk/create-investor": {
        investorsData: {
            type: Array, required: true
        }
    },
    "/data-by-fileName": {
        fileName: { type: String, required: true },
        page: { type: String, required: true },
        limit: { type: String, required: true },
    },
    "/create-investor": {
        uccRequestId: { type: String, },
        uccTmId: { type: String, },
        uccTmName: { type: String, },
        uccPanExempt: { type: String, },
        uccPanNo: { type: String, },
        uccCountry: { type: String, },
        uccMobileNo: { type: String, },
        uccEmailId: { type: String, },
        uccMobileNoModified: { type: String, },
        uccEmailIdModified: { type: String, },
        uccDpId: { type: String, },
        uccClientId: { type: String, },
        uccInvestorCode: { type: String, },
        uccRequestType: { type: String, },
        uccNodeStatus: { type: String, },
        uccEmailStatus: { type: String, },
        uccMobileStatus: { type: String, },
        uccPanStatus: { type: String, },
    },

    '/sendclean-webhook': {

    }
};

module.exports = function handler(req, res, next) {
    if (!investorApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, investorApiPathModels[req.path]);
};
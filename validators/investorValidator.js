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
    "/bulk/create-investor": {
        investorsData: {
            type:Array, required: true
        }
    },
    "/create-investor": {
        uccRequestId: { type: String,  },
        uccTmId: { type: String,  },
        uccTmName: { type: String,  },
        uccPanExempt: { type: String,  },
        uccPanNo: { type: String,  },
        uccCountry: { type: String,  },
        uccMobileNo: { type: String,  },
        uccEmailId: { type: String,  },
        uccMobileNoModified: { type: String,  },
        uccEmailIdModified: { type: String,  },
        uccDpId: { type: String,  },
        uccClientId: { type: String,  },
        uccInvestorCode: { type: String,  },
        uccRequestType: { type: String,  },
        uccNodeStatus: { type: String,  },
        uccEmailStatus: { type: String,  },
        uccMobileStatus: { type: String,  },
        uccPanStatus: { type: String,  }, 
    }
};

module.exports = function handler(req, res, next) {
    if (!investorApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, investorApiPathModels[req.path]);
};
const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
var request = require('request');


const investorMobileVerify = async (req, res) => {
    try {
        const status = req.query.status;
        var options = {
            'method': 'PUT',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorMobileStatus`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": req.reqId || 'U20220124999999991',
                "mobileStatus": status
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while verifying investor mobile",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}





const investorEmailVerify = async (req, res) => {
    try {
        const status = req.query.status;

        var options = {
            'method': 'PUT',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorEmailStatus`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": req.reqId || 'U20220124999999991',
                "emailIdStatus": status
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while verifying investor email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const getInvestorDetailByUccId = async (req, res) => {
    try {
        const { uccRequestId } = req.body;
        var options = {
            'method': 'GET',
            'url': `${process.env.HYPERLEDGER_HOST}/users/viewInvestorRequest/${uccRequestId}`,
            'headers': {
                'Content-Type': 'application/json'
            },
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data: JSON.parse(response.body )});
        });

    } catch (error) {
        const error_body = {
            error_message: "Error while verifying investor email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const sendInvestorEmailForVerification = async (req, res) => {
    try {
        investorFunctions.sendInvestorMail(req.query.email, res);
    } catch (error) {
        const error_body = {
            error_message: "Error while sending verification email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            message: error.message
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const addSingleInvestor = async (req, res) => {
    try {
        const { uccRequestId,
            uccTmId,
            uccTmName,
            uccPanExempt,
            uccPanNo,
            uccCountry,
            uccMobileNo,
            uccEmailId,
            uccMobileNoModified,
            uccEmailIdModified,
            uccDpId,
            uccClientId,
            uccInvestorCode,
            uccRequestType,
            uccNodeStatus,
            uccEmailStatus,
            uccMobileStatus,
            uccPanStatus,
            emailAttempts } = req.body;
        let investorObj = {
            uccRequestId: uccRequestId,
            uccTmId: uccTmId,
            uccTmName: uccTmName,
            uccPanExempt: uccPanExempt,
            uccPanNo: uccPanNo,
            uccCountry: uccCountry,
            uccMobileNo: uccMobileNo,
            uccEmailId: uccEmailId,
            uccMobileNoModified: uccMobileNoModified,
            uccEmailIdModified: uccEmailIdModified,
            uccDpId: uccDpId,
            uccClientId: uccClientId,
            uccInvestorCode: uccInvestorCode,
            uccRequestType: uccRequestType,
            uccNodeStatus: uccNodeStatus,
            uccEmailStatus: uccEmailStatus,
            uccMobileStatus: uccMobileStatus,
            uccPanStatus: uccPanStatus,
            emailAttempts: emailAttempts,
        }
        if (uccEmailStatus.toUpperCase() == EMAIL_STATUSES.NOT_VERIFIED) {
            investorObj = await investorFunctions.processInvestorEmail(investorObj);
        }
        if (uccMobileStatus.toUpperCase() == MOBILE_STATUSES.NOT_VERIFIED) {
            investorObj = await investorFunctions.processInvestorMobile(investorObj);
        }

        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/createInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(investorObj)
        };
        return request(options, function (error, response) {
            if (error) return res.json({ message: error.toString() }).status(RESPONSE_STATUS.SERVER_ERROR);
            else {
                return res.json({ message: 'Request queued successfully', investorObj: investorObj }).status(RESPONSE_STATUS.SUCCESS);
            }
        });
        // return res.json({ message: mobileProcessedInvObj }).status(RESPONSE_STATUS.SUCCESS);
    } catch (error) {
        const error_body = {
            error_message: "Error while sending verification email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,

            message: error.message
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

module.exports = {
    addSingleInvestor,
    investorEmailVerify,
    sendInvestorEmailForVerification,
    investorMobileVerify,
    getInvestorDetailByUccId
}
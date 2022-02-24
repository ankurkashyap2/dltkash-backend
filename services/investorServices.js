const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
var request = require('request');
const e = require('express');


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
                "uccRequestId": req.reqId ,
                "mobileStatus": status
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
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
                "uccRequestId": req.reqId ,
                "emailIdStatus": status
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
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
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
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



const addBulkinvestors = async (req, res) => {
    try {
        const { investorsData } = req.body;

        if (investorsData.length > 200) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Only 200 records allowed at once." });
        investorsData.forEach((inv) => {
            var country = inv.uccCountry.toLowerCase();
            if (COUNTRY_ARRAY[country]) {
                inv.UTCNotification = COUNTRY_ARRAY[country]['hours']
            } else {
                inv.UTCNotification = '10:30'
            }
        });
        investorsData.forEach((inv) => {
            console.log(inv.UTCNotification);
        });
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/createInvestors`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "investorsData": investorsData
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while adding bulk investors",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            message: error.message,
            stack: error.stack
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
            isPhoneEncrypted,
            isEmailEncrypted,
            uccMobileStatus,
            uccPanStatus,
            emailAttempts,
            mobileAttempts } = req.body;
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
            isEmailEncrypted: isEmailEncrypted || "false",
            isPhoneEncrypted: isPhoneEncrypted || "false",
            emailAttempts: emailAttempts || "0",
            mobileAttempts: mobileAttempts || "0"
        }

        var country = investorObj.uccCountry.toLowerCase();
        if (COUNTRY_ARRAY[country]) {
            investorObj.UTCNotification = COUNTRY_ARRAY[country]['hours']
        } else {
            investorObj.UTCNotification = '11'
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
       
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
        });
        
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
    getInvestorDetailByUccId,
    addBulkinvestors
}
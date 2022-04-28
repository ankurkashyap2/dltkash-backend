const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const mongoose = require('mongoose');

const investorMobileVerify = async (req, res) => {
    try {
        
        const { uccRequestId, uccMobileStatus } = req.body;
        const options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorMobileStatus`,
            // 'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "uccMobileStatus": uccMobileStatus,
                'mobileProcessed': 'true'
            })
            // body: JSON.stringify({
            //     "investor": {
            //         "uccRequestId": req.reqId,
            //         "mobileStatus": status,
            //         'mobileProcessed': 'true'
            //     }
            // })

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
        
        const { uccRequestId, uccEmailStatus } = req.body;

        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorEmailStatus`,
            // 'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "uccEmailStatus": uccEmailStatus,
                // "uccRequestId": req.reqId,
                // "emailIdStatus": status,
                'emailProcessed': 'true'
            })
            // body: JSON.stringify({
            //     "investor": {
            //         "uccRequestId": req.reqId,
            //         "emailIdStatus": status,
            //         'emailProcessed': 'true'
            //     }
            // })
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
        const { uccRequestId ,pageSize, bookmark} = req.body;
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "pageSize":pageSize,
                "bookmark":bookmark
            }),
            'headers': {
                'Content-Type': 'application/json'
            },
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: error.message });
            if (response.statusCode == 404) return res.status(response.statusCode || 500).json({ message:response.body });
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body)});
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



const sendCleanWebHook = async (req, res) => {
    try {
        console.log(req.SendCleantes_events, "response from send clean");
        console.log(req.body.SendCleantes_events, "response from send clean");
        return res.send('God bless you, SendClean')
    } catch (error) {
        const error_body = {
            error_message: "Error on recieve webhook",
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
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
       
        const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(askedUser.exchangeId) });

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
            mobileAttempts: mobileAttempts || "0",

        }
        investorObj.exchangeId = askedUser.exchangeId;
        investorObj.mobileProcessed = 'false';
        investorObj.emailProcessed = 'false';
        if (uccRequestType == UCC_REQUEST_TYPES.NEW) { investorObj.totalAttempts = askedExchange.newAttempts; }
        else {

            investorObj.totalAttempts = askedExchange.existingAttempts.toString();
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
        
        if(askedExchange){
            investorObj.exchangeId = askedExchange._id
        }
        const options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/createInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(investorObj)
        };
    

        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });


            return res.status(response.statusCode || 500).json(JSON.parse(response.body));
        });
        
    
    } catch (error) {
        const error_body = {
            error_message: "Error while sending verification email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            error_stack: error.stack,
            message: error.message
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const shortnerRedirect = (req, res) => {
    try {

    } catch (error) {
        const error_body = {
            error_message: "Error while redirecting to link",
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



const dataByFile = async (req, res) => {
    try {
        const { fileName, page, limit } = req.body;

        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fileName": fileName.toString().trim(),
                "page": page.toString(),
                "limit": limit.toString()
            })
        };
        request(options, function (error, response) {
            if (response.statusCode == 200) {
                return res.json(JSON.parse(response.body));
            } else {
                return res.status(response.statusCode || 500).json(JSON.parse(response.body) || RESPONSE_MESSAGES.SERVER_ERROR)
            }
        });




    } catch (err) {
        const error_body = {
            error_message: "Error while getting file data",
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
    addBulkinvestors,
    sendCleanWebHook,
    shortnerRedirect,
    dataByFile,


}
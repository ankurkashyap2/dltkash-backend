const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
const commonFunctions = require('../commonFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const RecordCounter = require('./../models/recordCounter');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const axios = require('axios')
var request = require('request');
const { isDate } = require('../commonFunctions');
const investorMobileVerify = async (req, res) => {
    try {
        const { uccRequestId, uccMobileStatus } = req.body;
        // const hourJustNow = new Date(Date.now()).getHours();
        // const setDate = commonFunctions.setRecordDateISO(new Date(Date.now()).toISOString());
        // const recordObj = await RecordCounter.findOne({ "date": setDate });
        // console.log(setDate)
        // if (!recordObj) {
        //     let newRecordObj = {
        //         date: setDate,
        //         perHourCounterArr: [{}]
        //     }
        //     newRecordObj.perHourCounterArr[0][hourJustNow] = [uccRequestId];
        //     console.log("CREATING OBJ IN MOBILE VERIFY")
        //     await RecordCounter.create(newRecordObj);
        // } else {
        //     if (Array.isArray(recordObj.perHourCounterArr)) {
        //         let arrObj = recordObj.perHourCounterArr[0];
        //         if (arrObj[hourJustNow]) {
        //             arrObj[hourJustNow].push(uccRequestId);
        //             arrObj[hourJustNow] = [...new Set(arrObj[hourJustNow])];
        //         } else
        //             arrObj[hourJustNow] = [uccRequestId];
        //             console.log("UPDATIG OBJ IN MOBILE VERIFY")
        //         await RecordCounter.updateOne({ "date": setDate }, { $set: { perHourCounterArr: [arrObj] } });
        //     }
        // }

        const options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorMobileStatus`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "uccMobileStatus": uccMobileStatus,
                'mobileProcessed': true
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            if (response.statusCode == 200) {
                const investorObj = {
                    uccRequestId: uccRequestId,
                    uccMobileStatus: uccMobileStatus
                }
                incrementCounter(investorObj)
            }
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while verifying investor mobile",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const incrementCounter = async (investorObj) => {
    const uccRequestId = investorObj.uccRequestId;
    const hourJustNow = new Date().getUTCHours();
    const setDate = new Date().setUTCHours(0, 0, 0, 0);
    const recordObj = await RecordCounter.findOne({ "date": setDate });
    if (!recordObj) {
        let newRecordObj = {
            date: setDate,
            perHourCounterArr: [{}]
        }
        newRecordObj.perHourCounterArr[0][hourJustNow] = [uccRequestId];
        await RecordCounter.create(newRecordObj);
    } else {
        if (Array.isArray(recordObj.perHourCounterArr)) {
            let arrObj = recordObj.perHourCounterArr[0];
            if (arrObj[hourJustNow]) {
                arrObj[hourJustNow].push(uccRequestId);
                arrObj[hourJustNow] = [...new Set(arrObj[hourJustNow])];
            } else
                arrObj[hourJustNow] = [uccRequestId];
            await RecordCounter.updateOne({ "date": setDate }, { $set: { perHourCounterArr: [arrObj] } });
        }
    }
}

// incrementCounter({
//     "uccRequestId": "INV0",
//     "mobileProcessed": true,
//     "uccEmailStatus": "VERIFIED",
//     "uccTmId": "TEAM2",
//     "uccTmName": "GROW",
//     "uccPanExempt": "false",
//     "uccPanNo": "PAN123000",
//     "uccCountry": "India",
//     "uccMobileNo": "8360335944",
//     "uccEmailId": "raju0@getnada.com",
//     "uccInvestorCode": "INV24",
//     "uccRequestType": "NEW",
//     "uccNodeStatus": "01"
// });


const investorEmailVerify = async (req, res) => {
    try {
        const { uccRequestId, uccEmailStatus } = req.body;
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestorEmailStatus`,

            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "uccEmailStatus": uccEmailStatus,
                'mobileProcessed': true
            })
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
            if (response.statusCode == 200) {
                const investorObj = {
                    uccRequestId: uccRequestId,
                    uccMobileStatus: uccEmailStatus
                }
                incrementCounter(investorObj)
            }
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
        console.log(error.stack)
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

const getInvestorDetailByUccId = async (req, res) => {
    try {
        const { fileName, uccRequestId, uccPanNo, uccMobileNo, uccEmailId, bookmark, pageSize, uccTmName, UTCNotification } = req.body;
        let token = req.headers["authorization"];
        let exchangeId;
        let tokenError = false;
        if (token) {
            token = token.split(" ");
            token = token.length > 1 ? token[1] : token[0];
            jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
                if (err) {
                    tokenError = true;
                    return;
                }
                req.reqId = decoded.reqId
                req.user_id = decoded.user_id
                req.email = decoded.email
            });
            const askedAdmin = await User.findOne({
                _id: mongoose.Types.ObjectId(req.user_id)
            });
            if (askedAdmin)
                exchangeId = askedAdmin.exchangeId;
        }
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "pageSize": pageSize,
                "bookmark": bookmark,
                "uccPanNo": uccPanNo,
                "fileName": fileName,
                "uccMobileNo": uccMobileNo,
                "uccEmailId": uccEmailId,
                "uccTmName": uccTmName,
                "exchangeId": exchangeId,
                "UTCNotification": UTCNotification
            }),
            'headers': {
                'Content-Type': 'application/json'
            },
        };
        request(options, function (error, response) {

            // if (error) return res.status(error.status).json({ message: error.message });
            if (response.statusCode == 404) return res.status(response.statusCode || 500).json({ message: response.body });
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) });
        });

    } catch (error) {
        const error_body = {
            error_message: "Error while verifying investor email",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            path: error.stack
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
        if (!askedExchange) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Admin not associated with exchange!" });
        const { uccRequestId,
            uccTmId,
            uccTmName,
            uccPanExempt,
            uccPanNo,
            uccCountry,
            uccMobileNo,
            uccEmailId,
            uccDpId,
            uccClientId,
            uccInvestorCode,
            uccRequestType,
            uccNodeStatus,
            uccEmailStatus,
            uccMobileStatus,
            uccPanStatus,
            emailAttempts,
            mobileAttempts,
            UTCNotification,
            mobileProcessed,
            emailProcessed } = req.body;
        let investorObj = {
            uccRequestId: uccRequestId,
            uccTmId: uccTmId,
            uccTmName: uccTmName,
            uccPanExempt: uccPanExempt,
            uccPanNo: uccPanNo,
            uccCountry: uccCountry,
            uccMobileNo: uccMobileNo,
            uccEmailId: uccEmailId,
            uccDpId: uccDpId,
            uccClientId: uccClientId,
            uccInvestorCode: uccInvestorCode,
            uccRequestType: uccRequestType,
            uccNodeStatus: uccNodeStatus,
            uccEmailStatus: uccEmailStatus,
            uccMobileStatus: uccMobileStatus,
            uccPanStatus: uccPanStatus,
            emailAttempts: emailAttempts || 0,
            mobileAttempts: mobileAttempts || 0,
            UTCNotification: UTCNotification,
            mobileProcessed: mobileProcessed,
            emailProcessed: emailProcessed,
        }


        let payload = { uccRequestId: uccRequestId };
        let response_ = await axios.post(`${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`, payload);
        let data = response_.data;
        if (data.results.length != 0) return res.status(409).json({ message: "Investor with  this uccRequestId already exists.", data: data.results[0].Record });

        let payload2;
        if (uccPanExempt.toString() == "true")
            payload2 = { uccEmailId: uccEmailId, uccMobileNo: uccMobileNo, uccPanNo: uccPanNo }
        if (uccPanExempt.toString() == "false")
            payload2 = { uccEmailId: uccEmailId, uccMobileNo: uccMobileNo, uccPanNo: uccPanNo }
        if (uccPanExempt.toString() == "true")
            payload2 = { uccEmailId: uccEmailId, uccMobileNo: uccMobileNo, uccDpId: uccDpId, uccClientId: uccClientId }


        let _response = await axios.post(`${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`, payload2);
        let dataForStatus = _response.data;
        if (dataForStatus.results.length == 0) {
            if (!uccEmailStatus) {
                investorObj = await investorFunctions.processInvestorEmailV3(investorObj);
            }
            if (!uccMobileStatus) {
                investorObj = await investorFunctions.processInvestorMobileV3(investorObj);
            }
        }
        if (investorObj.uccMobileStatus == MOBILE_STATUSES.NOT_APPLICABLE) {
            investorObj.mobileProcessed = true;
        }
        if (!investorObj.uccEmailId) investorObj.uccEmailId = investorObj.uccEmailId.toLowerCase()
        if (!investorObj.uccPanNo) investorObj.uccPanNo = investorObj.uccPanNo.toUpperCase()
        if (uccPanExempt.toString() == "false") {
            investorObj.L1 = commonFunctions.encryptWithAES(`${uccPanNo}`);
            investorObj.L2 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccMobileNo}-${uccEmailId}`);
            investorObj.L3 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccMobileNo}`);
            investorObj.L4 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccEmailId}`);
        }
        if (uccPanExempt.toString() == "true") {
            investorObj.L5 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}`);
            investorObj.L6 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccMobileNo}-${uccEmailId}`);
            investorObj.L7 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccMobileNo}`);
            investorObj.L8 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccEmailId}`);
        }
        investorObj.exchangeId = askedUser.exchangeId;
        if (!investorObj.mobileProcessed) {
            investorObj.mobileProcessed = false;
        }
        if (!investorObj.emailProcessed) {
            investorObj.emailProcessed = false;
        }
        if (uccRequestType == UCC_REQUEST_TYPES.NEW) { investorObj.totalAttempts = askedExchange.newAttempts; }
        else if (uccRequestType == UCC_REQUEST_TYPES.MODIFIED) {
            investorObj.totalAttempts = askedExchange.modifiedAttempts;
        } else if (uccRequestType == UCC_REQUEST_TYPES.EXISTING) { investorObj.totalAttempts = askedExchange.existingAttempts; } else { investorObj.totalAttempts = 7; }

        if (!UTCNotification) {
            var country = investorObj.uccCountry.toLowerCase();
            if (COUNTRY_ARRAY[country]) {
                investorObj.UTCNotification = COUNTRY_ARRAY[country]['hours']
            } else {
                investorObj.UTCNotification = '11'
            }
        }
        if (investorObj.uccEmailId) investorObj.uccEmailId = investorObj.uccEmailId.toLowerCase()
        if (investorObj.uccPanNo) investorObj.uccPanNo = investorObj.uccPanNo.toUpperCase()
        investorObj.exchangeId = askedExchange._id;
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
            error_message: "Error while creating single investor.",
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

//TETS
const updateInvestor = async (req, res) => {

    try {
        const investorObj = req.body;
        if (investorObj.uccMobileStatus == EMAIL_STATUSES.NOT_VERIFIED || investorObj.uccEmailStatus == EMAIL_STATUSES.NOT_VERIFIED) {
            await incrementCounter(investorObj);
        }
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(investorObj)
        };
        request(options, function (error, response) {
            if (response.statusCode == 200) return res.json({ message: "REQ SUCCUESS" });
        });

    } catch (err) {
        console.log(err.stack)
        console.error('error on updating userInfo on hyperledger')
    }
}

module.exports = {
    updateInvestor,
    addSingleInvestor,
    investorEmailVerify,
    sendInvestorEmailForVerification,
    investorMobileVerify,
    getInvestorDetailByUccId,
    addBulkinvestors,
    sendCleanWebHook,
    dataByFile,
    incrementCounter
}
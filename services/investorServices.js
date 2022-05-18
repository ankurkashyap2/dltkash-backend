const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
const commonFunctions = require('../commonFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const RecordCounter = require('./../models/recordCounter');
const mongoose = require('mongoose');
const moment = require("moment");

const investorMobileVerify = async (req, res) => {
    try {
        const { uccRequestId, uccMobileStatus, uccUpdatedAt } = req.body;
        var updatedAtNum = Number(uccUpdatedAt)
        if (!uccUpdatedAt) {
            const setDate = commonFunctions.setRecordDate(new Date(Date.now()));
            const recordObj = await RecordCounter.findOne({ "date": setDate });
            if (!recordObj) {
                const newRecordObj = {
                    date: setDate,
                    perHourCounterArr: [{ hour: new Date(Date.now()).getHours(), count: 1 }]
                }
                await RecordCounter.create(newRecordObj);
            } else {
                let updatedCounterArr = recordObj.perHourCounterArr;
                let presentHours = [];
                updatedCounterArr.forEach((eachObj) => {
                    presentHours.push(eachObj.hour);
                });

                if (presentHours.includes(new Date(Date.now()).getHours())) {
                    updatedCounterArr.forEach((eachObj) => {
                        if (eachObj.hour == new Date(Date.now()).getHours()) {
                            eachObj.count += 1;
                        }
                    });
                } else
                    updatedCounterArr.push({ hour: new Date(Date.now()).getHours(), count: 1 })
                recordObj.perHourCounterArr = updatedCounterArr;
                const savedObj = new RecordCounter(recordObj);
                await savedObj.save();
            }
        } else {
            const updatedDate = new Date(updatedAtNum);
            const setUpdatedDate = commonFunctions.setRecordDate(updatedDate);
            const recordObj = await RecordCounter.findOne({ "date": setUpdatedDate });

            if (setUpdatedDate.toString() != commonFunctions.setRecordDate(new Date(Date.now())).toString()) {
                if (!recordObj) {
                    const newRecordObj = {
                        date: setUpdatedDate,
                        perHourCounterArr: [{ hour: updatedDate.getHours(), count: 1 }]
                    }
                    await RecordCounter.create(newRecordObj);
                } else {
                    let updatedCounterArr = recordObj.perHourCounterArr;
                    let presentHours = [];
                    updatedCounterArr.forEach((eachObj) => {
                        presentHours.push(eachObj.hour);
                    });

                    if (presentHours.includes(updatedDate.getHours())) {
                        updatedCounterArr.forEach((eachObj) => {
                            if (eachObj.hour == updatedDate.getHours()) {
                                eachObj.count += 1;
                            }
                        });
                    } else
                        updatedCounterArr.push({ hour: updatedDate.getHours(), count: 1 })
                    recordObj.perHourCounterArr = updatedCounterArr;
                    const savedObj = new RecordCounter(recordObj);
                    await savedObj.save();
                }
            }
        }

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
            stack: error.stack
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}



const investorEmailVerify = async (req, res) => {
    try {

        const { uccRequestId, uccEmailStatus, uccUpdatedAt } = req.body;
        var updatedAtNum = Number(uccUpdatedAt)
        if (!uccUpdatedAt) {
            const setDate = commonFunctions.setRecordDate(new Date(Date.now()));
            const recordObj = await RecordCounter.findOne({ "date": setDate });
            if (!recordObj) {
                const newRecordObj = {
                    date: setDate,
                    perHourCounterArr: [{ hour: new Date(Date.now()).getHours(), count: 1 }]
                }
                await RecordCounter.create(newRecordObj);
            } else {
                let updatedCounterArr = recordObj.perHourCounterArr;
                let presentHours = [];
                updatedCounterArr.forEach((eachObj) => {
                    presentHours.push(eachObj.hour);
                });

                if (presentHours.includes(new Date(Date.now()).getHours())) {
                    updatedCounterArr.forEach((eachObj) => {
                        if (eachObj.hour == new Date(Date.now()).getHours()) {
                            eachObj.count += 1;
                        }
                    });
                } else
                    updatedCounterArr.push({ hour: new Date(Date.now()).getHours(), count: 1 })
                recordObj.perHourCounterArr = updatedCounterArr;
                const savedObj = new RecordCounter(recordObj);
                await savedObj.save();
            }
        } else {
            const updatedDate = new Date(updatedAtNum);
            const setUpdatedDate = commonFunctions.setRecordDate(updatedDate);
            const recordObj = await RecordCounter.findOne({ "date": setUpdatedDate });
            if (setUpdatedDate.toString() != commonFunctions.setRecordDate(new Date(Date.now())).toString()) {
                if (!recordObj) {
                    const newRecordObj = {
                        date: setUpdatedDate,
                        perHourCounterArr: [{ hour: updatedDate.getHours(), count: 1 }]
                    }
                    await RecordCounter.create(newRecordObj);
                } else {
                    let updatedCounterArr = recordObj.perHourCounterArr;
                    let presentHours = [];
                    updatedCounterArr.forEach((eachObj) => {
                        presentHours.push(eachObj.hour);
                    });

                    if (presentHours.includes(updatedDate.getHours())) {
                        updatedCounterArr.forEach((eachObj) => {
                            if (eachObj.hour == updatedDate.getHours()) {
                                eachObj.count += 1;
                            }
                        });
                    } else
                        updatedCounterArr.push({ hour: updatedDate.getHours(), count: 1 })
                    recordObj.perHourCounterArr = updatedCounterArr;
                    const savedObj = new RecordCounter(recordObj);
                    await savedObj.save();
                }
            }
        }

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
        const { uccRequestId, pageSize, bookmark } = req.body;
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            body: JSON.stringify({
                "uccRequestId": uccRequestId,
                "pageSize": pageSize,
                "bookmark": bookmark
            }),
            'headers': {
                'Content-Type': 'application/json'
            },
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: error.message });
            if (response.statusCode == 404) return res.status(response.statusCode || 500).json({ message: response.body });
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
            emailAttempts: emailAttempts || 0,
            mobileAttempts: mobileAttempts || 0,
        }
        if (uccPanExempt.toString()=="false") {
            investorObj.L1 = commonFunctions.encryptWithAES(`${uccPanNo}`);
            investorObj.L2 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccMobileNo}-${uccEmailId}`);
            investorObj.L3 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccMobileNo}`);
            investorObj.L4 = commonFunctions.encryptWithAES(`${uccPanNo}-${uccEmailId}`);
        } 
        if(uccPanExempt.toString()=="true") {
            investorObj.L5 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}`);
            investorObj.L6 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccMobileNo}-${uccEmailId}`);
            investorObj.L7 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccMobileNo}`);
            investorObj.L8 = commonFunctions.encryptWithAES(`${uccDpId}-${uccClientId}-${uccEmailId}`);
        }
        investorObj.exchangeId = askedUser.exchangeId;
        investorObj.mobileProcessed = 'false';
        investorObj.emailProcessed = 'false';
        if (uccRequestType == UCC_REQUEST_TYPES.NEW) { investorObj.totalAttempts = askedExchange.newAttempts; }
        else if (uccRequestType == UCC_REQUEST_TYPES.MODIFIED) {
            investorObj.totalAttempts = askedExchange.modifiedAttempts;
        } else if (uccRequestType == UCC_REQUEST_TYPES.EXISTING) { investorObj.totalAttempts = askedExchange.existingAttempts; } else { investorObj.totalAttempts = 7; }

        var country = investorObj.uccCountry.toLowerCase();
        if (COUNTRY_ARRAY[country]) {
            investorObj.UTCNotification = COUNTRY_ARRAY[country]['hours']
        } else {
            investorObj.UTCNotification = '11'
        }
        if (uccEmailStatus.toUpperCase() != EMAIL_STATUSES.VERIFIED) {
            investorObj = await investorFunctions.processInvestorEmail(investorObj);
        }

        if (uccMobileStatus.toUpperCase() != MOBILE_STATUSES.VERIFIED) {
            investorObj = await investorFunctions.processInvestorMobile(investorObj);
        }
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
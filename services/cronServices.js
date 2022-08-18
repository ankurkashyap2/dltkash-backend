const RecordFile = require('./../models/fileSpecs');
const ErrorLogs = require('./../models/errorLogs');
const fs = require('fs');
const { Rabbit } = require('rabbit-queue');
const QUEUE_NAME = process.env.QUEUE_NAME;
const { COUNTRY_ARRAY, EMAIL_STATUSES, MOBILE_STATUSES, UCC_REQUEST_TYPES, INVALID_ERROR_CODES } = require('./../constants');
const JSONStream = require('JSONStream');
const request = require('request');
const path = require('path');
const mongoose = require('mongoose');
const commonFunctions = require('./../commonFunctions');
const Exchange = require('./../models/exchange');
const { processInvestorMobileV3, processInvestorEmailV3 } = require('../investorFunctions');
const { incrementCounter } = require('./investorServices');


const rabbit = new Rabbit(process.env.PROCESS_QUEUE, {
    prefetch: 1, //default prefetch from queue
    replyPattern: true, //if reply pattern is enabled an exclusive queue is created
    scheduledPublish: false,
    prefix: '', //prefix all queues with an application name
    socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
});


const checkForUnprocessedFiles = async (FileForSearch_id) => {
    try {
        const recordFile = await RecordFile.findOne({
            status: "UNPROCESSED",
            _id: FileForSearch_id

        });
        if (recordFile) {
            const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(recordFile.exchangeId) });
            startFileProcessing(recordFile, askedExchange).then(() => { });
        } else {
            console.info('NO FILES TO PROCESS');
            return;
        }
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while checking cron for unprocessed files.",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
        };
        // ErrorLogs.create(error);
        console.error(error_body);
    }

}

const deleteProcessedFiles = async () => {
    try {
        const recordFiles = await RecordFile.find({
            status: "PROCESSED"
        });

        if (recordFiles) {
            for await (var file of recordFiles) {
                fs.unlinkSync(path.join(__uploadPath, file.fileName))
            }
            console.info('PROCESSED FILES DELETED');
            return;
        } else {
            console.info('NO FILES TO PROCESS');
            return;
        }
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while checking cron for unprocessed files.",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
        };
        // ErrorLogs.create(error);
        console.error(error_body);
    }
}

const canStartConsumer = async () => {
    var options = {
        'method': 'GET',
        'url': `${process.env.HYPERLEDGER_HOST}/users/verifyQueueData`,
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) console.info('ERROR ON START CONSUMER API ...');

    });
}


const startFileProcessing = async (recordFile, askedExchange) => {
    try {
        const readable = fs.createReadStream(path.join(__uploadPath, recordFile.fileName)).pipe(JSONStream.parse('*'));
        let c = 0;
        const invalidRecords = [];
        readable.on('data', (jsonObj) => {
            c++;
            try {
                const sanitized = sanitizer(jsonObj);
                //push in invalid records with sanitized.errCode
                if (sanitized.invalid) {
                    let Error_Obj = {
                        ...jsonObj,
                        err_reason: INVALID_ERROR_CODES[sanitized.errCode],
                        error_code: sanitized.errCode,
                        time: Date.now(),
                    }
                    invalidRecords.push(Error_Obj);
                } else {
                    jsonObj.exchangeId = recordFile.exchangeId;
                    //LEDGER IDS CHECKS
                    if (jsonObj.uccPanExempt.toString() == "false") {
                        jsonObj.L3 = commonFunctions.encryptWithAES(`${jsonObj.uccPanNo}-${jsonObj.uccMobileNo}`);
                        jsonObj.L2 = commonFunctions.encryptWithAES(`${jsonObj.uccPanNo}-${jsonObj.uccMobileNo}-${jsonObj.uccEmailId}`);
                        jsonObj.L4 = commonFunctions.encryptWithAES(`${jsonObj.uccPanNo}-${jsonObj.uccEmailId}`);
                        jsonObj.L1 = commonFunctions.encryptWithAES(`${jsonObj.uccPanNo}`);
                    }
                    if (jsonObj.uccPanExempt.toString() == "true") {
                        jsonObj.L5 = commonFunctions.encryptWithAES(`${jsonObj.uccDpId}-${jsonObj.uccClientId}`);
                        jsonObj.L6 = commonFunctions.encryptWithAES(`${jsonObj.uccDpId}-${jsonObj.uccClientId}-${jsonObj.uccMobileNo}-${jsonObj.uccEmailId}`);
                        jsonObj.L7 = commonFunctions.encryptWithAES(`${jsonObj.uccDpId}-${jsonObj.uccClientId}-${jsonObj.uccMobileNo}`);
                        jsonObj.L8 = commonFunctions.encryptWithAES(`${jsonObj.uccDpId}-${jsonObj.uccClientId}-${jsonObj.uccEmailId}`);
                    }
                    //ADD TOTAL ATTEMPTS
                    //************************************* */
                    if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.NEW) { jsonObj.totalAttempts = askedExchange.newAttempts }
                    else if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.EXISTING) { jsonObj.totalAttempts = askedExchange.existingAttempts }
                    else if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.MODIFIED) { jsonObj.totalAttempts = askedExchange.modifiedAttempts }
                    else {
                        jsonObj.totalAttempts = 7
                    }
                    //CHECK FOR NOT APPLICABLE
                    if (jsonObj.uccMobileStatus == MOBILE_STATUSES.NOT_APPLICABLE) {
                        jsonObj.mobileProcessed = true;
                    }
                    //************************************ */
                    if (!jsonObj.mobileAttempts) jsonObj.mobileAttempts = 0;
                    if (!jsonObj.emailAttempts) jsonObj.emailAttempts = 0;
                    if (jsonObj.fileName) jsonObj.fileName = recordFile.fileName
                    if (!jsonObj.mobileProcessed) jsonObj.mobileProcessed = false;
                    if (!jsonObj.emailProcessed) jsonObj.emailProcessed = false;
                    if (jsonObj.uccEmailId) jsonObj.uccEmailId = jsonObj.uccEmailId.toLowerCase();
                    if (jsonObj.uccPanNo) jsonObj.uccPanNo = jsonObj.uccPanNo.toUpperCase();
                    if (!jsonObj.refined) jsonObj.refined = false;
                    //chek for emailPocessed and MobileProcessed both are tue
                    //SEND TO QUEUE
                    rabbit.publish(QUEUE_NAME, jsonObj, { correlationId: '1' }).then(() => console.log(`message published ${c}`));
                }
            } catch (error) {
                let Error_Obj = {
                    ...jsonObj,
                    err_reason: INVALID_ERROR_CODES[06],
                    error_code: 06,
                    time: Date.now(),
                    systemErrorReason: error.stack
                }
                invalidRecords.push(Error_Obj);
            }
        });
        readable.on('end', async () => {
            if (invalidRecords.length) {
                recordFile.invalidRecords.push(invalidRecords);
            }
            console.log('processed success', c);
            recordFile.status = "PROCESSED";
            recordFile.save();
            canStartConsumer()
            console.log("CHANNEL CLOSED");
            return;
        });
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: `Error while processing file ${recordFile.fileName}`,
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,

        };
        // ErrorLogs.create(error);
        console.error(error_body);
    }
}

const sanitizer = (jsonObj) => {
    if (!jsonObj.uccPanExempt) {
        return { invalid: true, errCode: 02 }
    }
    if (!(jsonObj.uccPanExempt && ["true", "false"].includes(jsonObj.uccPanExempt.toString()))) {
        return { invalid: true, errCode: 02 }
    }
    if (jsonObj.uccPanExempt.toString() == 'true') {
        //if DPID adn CLIENTID missing errorCOde {}
        if (!(jsonObj.uccDpId && jsonObj.uccClientId)) {
            return { invalid: true, errCode: 00 }
        }
    }
    if (jsonObj.uccPanExempt.toString() == 'false') {
        if (!jsonObj.uccPanNo) {
            return { invalid: true, errCode: 01 }
        }
    }
    if (jsonObj.uccPanExempt.toString() == 'true' && jsonObj.uccPanNo) {
        return { invalid: true, errCode: 00 }
    }
    if (!jsonObj.uccEmailId) {
        return { invalid: true, errCode: 03 }
    }
    if (!jsonObj.uccMobileNo) {
        return { invalid: true, errCode: 04 }
    }
    if (!jsonObj.uccRequestType || (![UCC_REQUEST_TYPES.NEW, UCC_REQUEST_TYPES.EXISTING, UCC_REQUEST_TYPES.MODIFIED].includes(jsonObj.uccRequestType))) {
        return { invalid: true, errCode: 05 }
    }

    return { invalid: false }

}

const updateInvestor = async (investorObj) => {
    try {
        // if (investorObj.uccMobileStatus == EMAIL_STATUSES.NOT_VERIFIED || investorObj.uccEmailStatus == EMAIL_STATUSES.NOT_VERIFIED) {
        //     await incrementCounter(investorObj);
        // }
        const options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/updateInvestor`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(investorObj)
        };
        request(options, function (error, response) {
        });

    } catch (err) {
        console.log(err)
        console.error('error on updating userInfo on hyperledger')
    }
}
const HandleExistingRecord = (investor) => {
    if (investor.totalAttempts == 30) {
        console.log("hereee ")
        // when email is not already verified 
        if (!investor.emailProcessed){
            investor.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
            investor.emailProcessed = true;
        }
        if(!investor.mobileProcessed){
            investor.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
            investor.mobileProcessed = true;
        }
        investor.refined= true ; 
        updateInvestor(investor);
    } else {
        investor.totalAttempts++;
        updateInvestor(investor)
    }
}
const investorDataOperator = async (investorsData) => {
    try {
        for await (let k of investorsData) {
            let investor = k.Record;
            const EmailProcessed = investor.emailProcessed;
            const MobileProcessed = investor.mobileProcessed
            if (investor.uccRequestType == UCC_REQUEST_TYPES.EXISTING) {
                HandleExistingRecord(investor)
            } else {
                if (investor.uccEmailStatus == EMAIL_STATUSES.VERIFIED && investor.uccMobileStatus == MOBILE_STATUSES.VERIFIED) { };
                await processInvestorMobileV3(investor).then(async (investorAfterMobileProcess) => {
                    await processInvestorEmailV3(investorAfterMobileProcess).then(investorAfterEmailProcess => {
                        // if (!investorAfterEmailProcess.uccEmailStatus || !investorAfterEmailProcess.uccMobileStatus || investorAfterEmailProcess.emailProcessed == false || investorAfterEmailProcess.mobileProcessed == false || (EmailProcessed != investorAfterEmailProcess.emailProcessed) || (MobileProcessed != investorAfterEmailProcess.mobileProcessed)) {
                        //     updateInvestor(investorAfterEmailProcess);
                        // }
                        updateInvestor(investorAfterEmailProcess);
                    })
                });
            }
        }
    }
    catch (errror) {
        console.log('ERRROR STACK ITERATING OVER INVESTOR DATA OPERATOR', errror.stack)
    }
}


const sendRequestToFetchInvestors = async (bookmark = "", uccRequestType, refined) => {
    try {
        const pageSize = 100;
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            // 'url': `http://54.159.25.214/api/users/getInvestorsByKey`,
            // 'url': `https://silent-paper-45295.pktriot.net/api/users/getInvestorsByKey`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uccRequestType": uccRequestType,
                "refined": false,
                "pageSize": pageSize,
                "bookmark": `${bookmark}`,
            })
        };
        request(options, function (error, response) {
            if (response.statusCode == 500) {
                console.error('error on fetching requests from hyperledger', response.body);
                return;
            };
            if (response.statusCode == 404) {
                console.error('error on fetching requests from hyperledger');
                return;
            };
            const result = JSON.parse(response.body);
            if (result.results)
                bookmark = result.bookmark;
            investorDataOperator(result.results);
            if (result.results == 0 || result.recordsCount < pageSize) {
                return;
            }
            sendRequestToFetchInvestors(bookmark, uccRequestType, refined);

        });
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while requesting user data",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
        };
        console.error(error_body);
    }

}

const notificationSendingLogic = async (uccRequestType) => {
    try {
        // sendRequestToFetchInvestors({bookmark :"", uccRequestType:uccRequestType});
        sendRequestToFetchInvestors("", uccRequestType);
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while checking cron to fetch users.",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
        };
        // ErrorLogs.create(error);
        console.error(error_body);
    }
}

// notificationSendingLogic()

module.exports = {
    checkForUnprocessedFiles,
    startFileProcessing,
    deleteProcessedFiles,
    notificationSendingLogic
}
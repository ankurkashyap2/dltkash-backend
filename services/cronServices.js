const RecordFile = require('./../models/fileSpecs');
const ErrorLogs = require('./../models/errorLogs');
const fs = require('fs');
const { Rabbit } = require('rabbit-queue');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const { COUNTRY_ARRAY, EMAIL_STATUSES, MOBILE_STATUSES, UCC_REQUEST_TYPES } = require('./../constants');
const JSONStream = require('JSONStream');
const request = require('request');
const path = require('path');
const mongoose = require('mongoose');
const commonFunctions = require('./../commonFunctions');
const Exchange = require('./../models/exchange');
const { processInvestorMobileV3, processInvestorEmailV3 } = require('../investorFunctions');


const rabbit = new Rabbit(process.env.PROCESS_QUEUE, {
    prefetch: 1, //default prefetch from queue
    replyPattern: true, //if reply pattern is enabled an exclusive queue is created
    scheduledPublish: false,

    prefix: '', //prefix all queues with an application name
    socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
});


const checkForUnprocessedFiles = async () => {
    try {
        const recordFile = await RecordFile.findOne({
            status: "UNPROCESSED"
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

        c = 0;
        const indianTimeUtcArr = ['11', '12', '10', '9', '8', '7', '6', '5', '13', '4', '3', '12', '13'];
        readable.on('data', (jsonObj) => {
            c++;
            jsonObj.exchangeId = recordFile.exchangeId;
            if (!jsonObj.UTCNotification) {
                if (jsonObj.uccCountry) {
                    if (jsonObj.uccCountry.toLowerCase() == 'india') {
                        //"11:00" UTC  = 4:30 PM 
                        jsonObj.UTCNotification = indianTimeUtcArr[Math.floor(Math.random() * indianTimeUtcArr.length)];
                    } else if (jsonObj.uccCountry == 'No Specific Country') {
                        jsonObj.UTCNotification = indianTimeUtcArr[Math.floor(Math.random() * indianTimeUtcArr.length)];
                    }
                    else {
                        jsonObj.UTCNotification = COUNTRY_ARRAY[jsonObj.uccCountry.toLowerCase()].hours.split(':')[0];
                    }
                }
            }
            //LEDGER IDS CHECKS

            //ADD TOTAL ATTEMPTS
            //************************************* */
            if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.NEW) { jsonObj.totalAttempts = askedExchange.newAttempts }
            else if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.EXISTING) { jsonObj.totalAttempts = askedExchange.existingAttempts }
            else if (jsonObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.MODIFIED) { jsonObj.totalAttempts = askedExchange.modifiedAttempts }
            else {
                jsonObj.totalAttempts = 7
            }
            //************************************ */
            if (!jsonObj.mobileAttempts) jsonObj.mobileAttempts = 0;
            if (!jsonObj.emailAttempts) jsonObj.emailAttempts = 0;
            if (!jsonObj.fileName) jsonObj.fileName = recordFile.fileName
            if (!jsonObj.mobileProcessed) jsonObj.mobileProcessed = false;
            if (!jsonObj.emailProcessed) jsonObj.emailProcessed = false;

            //SEND TO QUEUE
            rabbit.publish(QUEUE_NAME, jsonObj, { correlationId: '1' }).then(() => console.log(`message published ${c}`));
        });
        readable.on('end', () => {
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

const updateInvestor = (investorObj) => {
    try {
        var options = {
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
        console.error('error on updating userInfo on hyperledger')
    }
}

// FILE PARSE INTO PER 10k PARTS
const FileParser = (recordFile) => {
    try {
        let readable = fs.createReadStream(path.join(__uploadPath, recordFile.fileName)).pipe(JSONStream.parse('table.*'));

        readable.on('data', (jsonObj) => {
            console.log(jsonObj.uccRequestId);
        })
        readable.on('end', () => {
            console.log('processed success');
            recordFile.status = "PROCESSED";
            recordFile.save();
        })
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


const investorDataOperator = async (investorsData) => {
    try {
        for await (let k of investorsData) {
            let investor = k.Record;
            const MobileStatus = investor.uccMobileStatus;
            const EmailStatus = investor.uccEmailStatus;
            const EmailProcessed = investor.emailProcessed;
            const MobileProcessed = investor.mobileProcessed
            if (investor.uccEmailStatus == EMAIL_STATUSES.VERIFIED && investor.uccMobileStatus == MOBILE_STATUSES.VERIFIED) return;
            await processInvestorMobileV3(investor).then(async (investorAfterMobileProcess) => {
                await processInvestorEmailV3(investorAfterMobileProcess).then(investorAfterEmailProcess => {
                
                    if (!investorAfterEmailProcess.uccEmailStatus || !investorAfterEmailProcess.uccMobileStatus || investorAfterEmailProcess.emailProcessed == false || investorAfterEmailProcess.mobileProcessed == false || (EmailProcessed != investorAfterEmailProcess.emailProcessed) || (MobileProcessed != investorAfterEmailProcess.mobileProcessed)) {
                        updateInvestor(investorAfterEmailProcess);
                    }
                    // updateInvestor(investorAfterEmailProcess);
                })
            });

        }
    }
    catch (errror) {
        console.log('ERRROR STACK ITERATING OVER INVESTOR DAATA OPERATOR', errror.stack)
    }
}


const sendRequestToFetchInvestors = async (bookmark = "") => {
    try {
        const pageSize = 100;
        const hoursToMatch = (new Date()).getHours();
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            // 'url': `http://54.159.25.214/api/users/getInvestorsByKey`,
            // 'url': `https://silent-paper-45295.pktriot.net/api/users/getInvestorsByKey`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "UTCNotification": hoursToMatch,
                "pageSize": pageSize,
                "bookmark": `${bookmark}`
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
            console.log(` NO OF RESULTS ${result.recordsCount}`)
            if (result.results)
                bookmark = result.bookmark;
            investorDataOperator(result.results);
            // sendRequestToFetchInvestors(bookmark);
            if (result.results == 0 || result.recordsCount < pageSize) {

                return;
            }
            // console.log(result.results)
            // investorDataOperator(result.results);
            sendRequestToFetchInvestors(bookmark);
        });
    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while requesting user data",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
        };
        // ErrorLogs.create(error);
        console.error(error_body);
    }

}

// sendRequestToFetchInvestors()
var k = [{
    "uccRequestId": "234718212902",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "9877114806",
    "uccEmailId": "a@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
},

];


var k2 = [{
    "uccRequestId": "234718212902",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "9877114806",
    "uccEmailId": "aaaaaaa@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
},
{
    "uccRequestId": "11",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "7696167115",
    "uccEmailId": "bcb@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
},
{
    "uccRequestId": "11",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "7696167115",
    "uccEmailId": "bcb@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
},
{
    "uccRequestId": "11",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "7696167115",
    "uccEmailId": "bcb@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
},
{
    "uccRequestId": "11",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "7696167115",
    "uccEmailId": "bcb@getnada.com",
    "uccMobileNoModified": "false",
    "uccEmailIdModified": "false",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "NEW",
    "uccNodeStatus": "01",
    "uccEmailStatus": "NOT VERIFIED",
    "uccMobileStatus": "NOT VERIFIED",
    "uccPanStatus": "VERIFIED",
    "emailAttempts": "1",
    "mobileAttempts": "1",
    "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
    "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
    "isEmailEncrypted": "false",
    "isPhoneEncrypted": "false",
    "UTCNotification": "15:00"
}
];




const notificationSendingLogic = async () => {
    try {
        sendRequestToFetchInvestors();
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
    FileParser,
    deleteProcessedFiles,
    notificationSendingLogic
}
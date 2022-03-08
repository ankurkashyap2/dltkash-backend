const RecordFile = require('./../models/fileSpecs');
const ErrorLogs = require('./../models/errorLogs');
const fs = require('fs');
const { Rabbit } = require('rabbit-queue');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const { COUNTRY_ARRAY, EMAIL_STATUSES, MOBILE_STATUSES } = require('./../constants');
const JSONStream = require('JSONStream');
const request = require('request');
const path = require('path');
const commonFunctions = require('./../commonFunctions');
const { processInvestorEmail, processInvestorMobile } = require('../investorFunctions');

const checkForUnprocessedFiles = async () => {
    try {
        const recordFile = await RecordFile.findOne({
            status: "UNPROCESSED"
        });
        if (recordFile) startFileProcessing(recordFile).then(() => { }); else {
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
        console.log(response.body);
    });
}


const startFileProcessing = async (recordFile) => {
    try {
        let readable = fs.createReadStream(path.join(__uploadPath, recordFile.fileName)).pipe(JSONStream.parse('*'));
        const rabbit = new Rabbit('amqps://ozeiszoe:7gYRxai3pEeQQA5qwU78RUnaz1Y7QFvH@armadillo.rmq.cloudamqp.com/ozeiszoe', {
            prefetch: 1, //default prefetch from queue
            replyPattern: true, //if reply pattern is enabled an exclusive queue is created
            scheduledPublish: false,
            prefix: '', //prefix all queues with an application name
            socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
        });
        c = 0;
        const indianTimeUtcArr = ['11', '12', '10', '9', '8', '7', '6', '5', '13'];
        readable.on('data', (jsonObj) => {
            c++;

            jsonObj.isEmailEncrypted = 'true';
            jsonObj.isPhoneEncrypted = 'true';
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
            jsonObj.mobileAttempts = '0';
            jsonObj.emailAttempts = '0';
            jsonObj.fileName = recordFile.fileName
            
            //SEND TO QUEUE
            rabbit.publish(QUEUE_NAME, jsonObj, { correlationId: '1' }).then(() => console.log(`message published ${c}`));
        });
        readable.on('end', () => {
            console.log('processed success', c);
            recordFile.status = "PROCESSED";
            recordFile.save();
            rabbit.publish(QUEUE_NAME, { "MSG": "EOF" }, { correlationId: '1' }).then(() => console.log(`message published ${c}`));
            canStartConsumer();
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
            body: JSON.stringify({
                "investor": investorObj
            })
        };
        request(options, function (error, response) {
        });

    } catch (err) {
        console.error('error on updating userInfo on hyperledger')
    }
}

// FILE PARSE INTO PER 10k PARTS
const FileParser =  (recordFile) => {
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
    // const promises = [];
    // const innerpromises = [];

    // investorsData.forEach((investor) => {
    //     const investorObj = { ...investor }
    //     promises.push(processInvestorEmail(investorObj));
    // })

    // const investerEmailResults = await Promise.all(promises);

    // investerEmailResults.forEach((emailProcessed) => {

    //     const emailProcessedObj = { ...emailProcessed }
    //     innerpromises.push(processInvestorMobile(emailProcessedObj))
    // })

    // const resultsFinal = await Promise.all(investerEmailResults);
    // console.log(resultsFinal);
    try {
        for await (let investor of investorsData) {
            if (investor.uccEmailStatus == EMAIL_STATUSES.VERIFIED && investor.uccMobileStatus == MOBILE_STATUSES.VERIFIED) return;
            await processInvestorMobile(investor).then(async (mobileProcessed) => {
                await processInvestorEmail(mobileProcessed).then(emailProcessed => {
                    console.log("UPDATING REQUEST FOR ", emailProcessed.uccRequestType ,emailProcessed.uccEmailId)
                    updateInvestor(emailProcessed);
                })
            });
        };
    }
    catch (errror) {
        // console.log('ERRROR STACK ITERATING OVER INVESTOR DAATA OPERATOR', errror.stack)
    }
}


const sendRequestToFetchInvestors = async (page = 1) => {
    try {
        const hoursToMatch = (new Date()).getHours();
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "notificationKey": hoursToMatch,
                "page": `${page}`,
                "limit": "100"
            })
        };
        request(options, function (error, response) {
            if (response.statusCode == 500) {
                //Error logs
                console.log('error on fetching requests from hyperledger');
                return;
            };
            if (response.statusCode == 404) {
                //Error logs
                console.log('error on fetching requests from hyperledger');
                return;
            };
  
            const result = JSON.parse(response.body);
            if(result.results)
            console.log('total records>>>>>>> on this page', result.results.length);
            if (result.results == 0) return;
            investorDataOperator(result.results);
            sendRequestToFetchInvestors(page + 1);
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


// notificationSendingLogic();

module.exports = {
    checkForUnprocessedFiles,
    startFileProcessing,
    FileParser,
    deleteProcessedFiles,
    notificationSendingLogic
}
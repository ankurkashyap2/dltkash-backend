const RecordFile = require('./../models/fileSpecs');
const ErrorLogs = require('./../models/errorLogs');
const fs = require('fs');
const { Rabbit } = require('rabbit-queue');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const { COUNTRY_ARRAY } = require('./../constants');
const JSONStream = require('JSONStream');
const request = require('request');
const path = require('path');

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

const startFileProcessing = async (recordFile) => {
    try {
        let readable = fs.createReadStream(path.join(__uploadPath, recordFile.fileName)).pipe(JSONStream.parse('table.*'));
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
            if (jsonObj.uccCountry.toLowerCase() == 'india') {
                //"11:00" UTC  = 4:30 PM 
                jsonObj.UTCNotification = indianTimeUtcArr[Math.floor(Math.random() * indianTimeUtcArr.length)];
            }
            else {
                jsonObj.UTCNotification = COUNTRY_ARRAY[jsonObj.uccCountry.toLowerCase()].hours.split(':')[0];
            }
            //SEND TO QUEUE
            rabbit.publish(QUEUE_NAME, jsonObj, { correlationId: '1' }).then(() => console.log(`message published ${c}`));
        });
        readable.on('end', () => {
            console.log('processed success', c);
            recordFile.status = "PROCESSED";
            recordFile.save();
            console.log("QUEUE CLOSED");
            return ;
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



// FILE PARSE INTO PER 10k PARTS
const FileParser = async (recordFile) => {
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



const investorDataOperator = async () => {

}

const notificationSendingLogic = async () => {
    try {
        const hoursToMatch = (new Date()).getHours();
        const page = 0;
        const limit = 100;
        var options = {
            'method': 'GET',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByLimit?page=${page}&limit=${limit}&notificationKey=${hoursToMatch}`,
            'headers': {}
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            investorDataOperator(response.body).then(() => { });
        });

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
module.exports = {
    checkForUnprocessedFiles,
    startFileProcessing,
    FileParser,
    notificationSendingLogic
}
const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
const commonFunctions = require('../commonFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const RecordCounter = require('./../models/recordCounter');
const RecordFiles = require("./../models/fileSpecs");
const mongoose = require('mongoose');
const moment = require("moment");
// Investor featch data in range of two dates

const getInvestorByDate = async (req, res) => {
    try {
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(askedUser.exchangeId) });
        let { from, to, pageSize, bookmark } = req.body;
        let totalRecord = 0;
        let invalidRecords = [];
        // get indian time dates from API convert them to UTC
        const UTCfrom = new Date(from).toISOString();
        const UTCto = new Date(to).toISOString();
        const fromHour = new Date(UTCfrom).getUTCHours();
        const toHour = new Date(UTCto).getUTCHours();
        const toUTC = new Date(to).setUTCHours(0, 0, 0, 0);
        const fromUTC = new Date(from).setUTCHours(0, 0, 0, 0);
        console.log(fromUTC, toUTC)
        const recordCounterDateObjs = await RecordCounter.find({ 'date': { $gte: fromUTC, $lte: toUTC } });
        const recordFiles = await RecordFiles.find({ 'createdAt': { $gte: fromUTC, $lte: toUTC } });
        recordFiles.forEach(rec => {
            rec.invalidRecords.forEach((record) => {
                invalidRecords.push(...record);
            });

        });
        recordCounterDateObjs.forEach((recordCounterObj) => {
            //ITS THE START DATE AND ITS THE END DATE
            if (commonFunctions.isDatesEqual(recordCounterObj.date, toUTC) && commonFunctions.isDatesEqual(recordCounterObj.date, fromUTC)) {
                let perHourCounterArr = recordCounterObj.perHourCounterArr[0];
                const arr = [];
                for (const entry of Object.entries(perHourCounterArr)) {
                    if (parseInt(entry[0]) >= fromHour && parseInt(entry[0]) <= toHour)
                        arr.push(...entry[1])
                }
                let arrSet = [...new Set(arr)];
                totalRecord += arrSet.length;
            }
            //ITS THE END DATE NOT THE START DATE ==>
            else if (commonFunctions.isDatesEqual(recordCounterObj.date, fromUTC)) {
                let perHourCounterArr = recordCounterObj.perHourCounterArr[0];
                const arr = [];
                for (const entry of Object.entries(perHourCounterArr)) {
                    if (parseInt(entry[0]) <= toHour)
                        arr.push(...entry[1])
                }
                let arrSet = [...new Set(arr)];
                totalRecord += arrSet.length;
            }
            //ITS THE START DATE NOT THE END DATE ==> hours will be counted from start UTCfrom to end 
            else if (commonFunctions.isDatesEqual(recordCounterObj.date, toUTC)) {
                let perHourCounterArr = recordCounterObj.perHourCounterArr[0];
                const arr = [];
                for (const entry of Object.entries(perHourCounterArr)) {
                    if (parseInt(entry[0]) >= fromHour)
                        arr.push(...entry[1])
                }
                let arrSet = [...new Set(arr)];
                totalRecord += arrSet.length;
            }
            //IN BETWEEN DAYS
            else if (!commonFunctions.isDatesEqual(recordCounterObj.date, toUTC) && !commonFunctions.isDatesEqual(recordCounterObj.date, fromUTC)) {
                let perHourCounterArr = recordCounterObj.perHourCounterArr[0];
                const arr = [];
                for (const key of Object.values(perHourCounterArr)) {
                    arr.push(...key)
                }
                let arrSet = [...new Set(arr)];
                totalRecord += arrSet.length;
            }
        })
        const exchangeId = askedExchange._id;
        const options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/fetchInvestors`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "from": from,
                "to": to,
                "pageSize": pageSize,
                "bookmark": bookmark,
                "exchangeId": exchangeId,
            })
        };
        request(options, function (error, response) {
            if (response.statusCode == 200) {
                return res.json({ invalidRecords: invalidRecords, data: JSON.parse(response.body) });
            } else {
                return res.status(response.statusCode || 500).json(JSON.parse(response.body) || RESPONSE_MESSAGES.SERVER_ERROR)
            }
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while getting file data",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack,
            message: error.message
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

module.exports = {
    getInvestorByDate
}
const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
const commonFunctions = require('../commonFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const RecordCounter = require('./../models/recordCounter');
const mongoose = require('mongoose');
const moment = require("moment");
// Investor featch data in range of two dates

const getInvestorByDate = async (req, res) => {
    try {
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(askedUser.exchangeId) });
        const { from, to, pageSize, bookmark } = req.body;
        let totalRecord = 0;
        const epocFrom = commonFunctions.returnEpoch(from);
        const epocTo = commonFunctions.returnEpoch(to);
        const toHour = new Date(epocFrom).getHours();
        const fromHour = new Date(epocTo).getHours();

        const fromMoment = moment(epocFrom).format('MM/DD/YYYY');
        const toMoment = moment(epocTo).format('MM/DD/YYYY');

        const askedDates = await RecordCounter.find({ 'date': { $gte: fromMoment, $lte: toMoment } });
        askedDates.forEach((e) => {
            if (e.date == fromMoment) {
                let perHourArray = e.perHourCounterArr
                perHourArray.forEach((perHourArrayObj) => {
                    if (perHourArrayObj >= fromHour)
                        totalRecord = totalRecord + perHourArrayObj.count;
                })
            } 
             if (e.date == toMoment) {
                let perHourArray = e.perHourCounterArr
                perHourArray.forEach((perHourArrayObj) => {
                    if (perHourArrayObj <= toHour)
                        totalRecord = totalRecord + perHourArrayObj.count;
                })
            } 
            if(e.date!=fromMoment ||e.date!=toMoment) {
                let perHourArray = e.perHourCounterArr
                perHourArray.forEach((perHourArrayObj) => {

                    totalRecord = totalRecord + perHourArrayObj.count;
                })
            }
        })
       


        const exchangeId = askedExchange._id;
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/fetchInvestors`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "from": from,
                "to": to,
                "pagesize": pageSize,
                "bookmark": bookmark,
                "exchangeId": exchangeId,
            })
        };
        request(options, function (error, response) {
            if (response.statusCode == 200) {
                return res.json({data: JSON.parse(response.body), totalRecord: totalRecord});
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
    getInvestorByDate
}
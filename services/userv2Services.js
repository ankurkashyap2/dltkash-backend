const { RESPONSE_MESSAGES, RESPONSE_STATUS, MOBILE_STATUSES, EMAIL_STATUSES, COUNTRY_ARRAY, UCC_REQUEST_TYPES } = require('./../constants');
const investorFunctions = require('./../investorFunctions');
var request = require('request');
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const mongoose = require('mongoose');
// Investor featch data in range of two dates
const getInvestorByDate=async(req,res)=>{
    try {
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(askedUser.exchangeId) });
        const { from, to, pageSize,bookmark } = req.body;
       
        
        const exchangeId = askedExchange._id ; 
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
                "bookmark":bookmark ,
                "exchangeId":exchangeId ,
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
    getInvestorByDate
}
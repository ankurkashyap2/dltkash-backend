const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./../constants');




const fetchInvestorsAndSendToBlockchain = async (req, res) => {
    try {
        const { investors } = req.body;
        console.log(req.body);
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
    } catch (error) {
        const error_body = {
            error_message: "Error while fetching users and sending to blockchain",
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
    fetchInvestorsAndSendToBlockchain
}
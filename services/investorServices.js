const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./../constants');
const investorFunctions = require('./../investorFunctions');





const investorEmailVerify = async (req, res) => {
    try {
        const investorEmail = req.email;
        const status = req.query.status;
        console.log({ investorEmail, status });
        //query data on blockchain on email ...
        // if user exists .. 
        // run blockchain QUERY to update email status on blockchain...
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS });

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



module.exports = {
    
    investorEmailVerify,
    sendInvestorEmailForVerification
}
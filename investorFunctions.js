const commonFunctions = require('./commonFunctions');
const jwt = require('jsonwebtoken');
const pug = require('pug');
const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./constants');
const sendInvestorMail = (email, res) => {

    // send on blockchain for querying data if user exists or not ..
    //assuming user exists ..
    //check if user email is not verified .. then send email
    let token = jwt.sign({ email: email }, process.env.JWTSECRET, {
        expiresIn: '24h',
    });
    const mailBody = {
        email: email,
        ref: `${process.env.FEHOST}/investor/email-verification?token=${token}`
    }
    const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
    commonFunctions.sendMail(email, 'Investor Email Verify Mock', html, (err, response) => {
        if (err)
        // mail send failure system ....
        {
            if (res)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
        }
    });
    // attempts to be send on blockchain update ....
    if (res)
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
}



module.exports = {
    sendInvestorMail
}
const commonFunctions = require('./commonFunctions');
const jwt = require('jsonwebtoken');
const pug = require('pug');
const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./constants');
const { EMAIL_STATUSES, MOBILE_STATUSES, UCC_REQUEST_TYPES, COUNTRY_ARRAY } = require('./constants');

const processInvestorEmailV3 = async (investorObj) => {
    return new Promise((resolve, reject) => {
        if (investorObj.emailProcessed) {
            return resolve(investorObj)
        }
        if (!commonFunctions.validateEmail(investorObj.uccEmailId)) {
            investorObj.uccEmailStatus = EMAIL_STATUSES.INVALID;
            investorObj.emailProcessed = true;
            investorObj.uccUpdatedAt = Number(new Date());
            resolve(investorObj);
        }
        const EMAIL_STATUS = investorObj.uccEmailStatus;
        const REQ_TYPE = investorObj.uccRequestType;
        const LINK_EXPIRY = REQ_TYPE == UCC_REQUEST_TYPES.EXISTING ? `${investorObj.totalAttempts * 24}h` : `24h`;
        let token = jwt.sign({ email: investorObj.uccEmailId, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, { expiresIn: LINK_EXPIRY });
        const mailBody = {
            email: investorObj.uccEmailId,
            ref: `${process.env.FEHOST}/investor/email-verification/${investorObj.uccRequestId}/${token}`,
            investorObj: investorObj
        }
        const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
        if (!EMAIL_STATUS) {
            commonFunctions.sendMail(investorObj.uccEmailId, 'Verification of e-mail ID linked to your UCC', html, (err, res, body) => {

                if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.emailProcessed = true;
                if (err) {
                    // handle email error
                    investorObj.uccEmailStatus = EMAIL_STATUSES.SENT
                    console.log(err)
                }
                else {

                    let noEmailAttempts = parseInt(investorObj.emailAttempts);
                    noEmailAttempts = noEmailAttempts + 1;
                    investorObj.emailAttempts = noEmailAttempts;
                    investorObj.uccEmailStatus = EMAIL_STATUSES.SENT
                }
                resolve(investorObj);
            });
        } else {

            if (EMAIL_STATUS == EMAIL_STATUSES.SENT) {
                if (investorObj.emailAttempts >= investorObj.totalAttempts) {
                    investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
                    investorObj.emailProcessed = true;
                    investorObj.uccUpdatedAt = Number(new Date());
                    resolve(investorObj);
                } else {
                    if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) {
                        investorObj.emailAttempts++;
                        resolve(investorObj);
                    } else {
                        commonFunctions.sendMail(investorObj.uccEmailId, 'Verification of e-mail ID linked to your UCC', html, (err, res, body) => {

                            // if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.emailProcessed = true;

                            if (err) {
                                // handle email error
                                investorObj.uccEmailStatus = EMAIL_STATUSES.SENT;
                                console.log(err);
                            }
                            else {
                                // add mail attempts

                                let noEmailAttempts = parseInt(investorObj.emailAttempts);
                                noEmailAttempts = noEmailAttempts + 1;
                                investorObj.emailAttempts = noEmailAttempts;
                                investorObj.uccEmailStatus = EMAIL_STATUSES.SENT;
                            }
                            resolve(investorObj);
                        });
                    }
                }
            }
            if (EMAIL_STATUS == EMAIL_STATUSES.VERIFIED || EMAIL_STATUS == EMAIL_STATUSES.REJECTED || EMAIL_STATUS == EMAIL_STATUSES.NOT_VERIFIED || EMAIL_STATUS == EMAIL_STATUSES.INVALID || EMAIL_STATUS == EMAIL_STATUSES.HOLD || EMAIL_STATUS == EMAIL_STATUSES.LINK_EXPIRED) resolve(investorObj);
        }
    });
}


const processInvestorMobileV3 = async (investorObj) => {
    return new Promise((resolve, reject) => {
        if (investorObj.mobileProcessed) {
            return resolve(investorObj)
        }
        if (!commonFunctions.validateMobile(investorObj.uccMobileNo)) {
            investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_APPLICABLE;
            investorObj.mobileProcessed = true;
            investorObj.uccUpdatedAt = Number(new Date());
            resolve(investorObj);
        }
        const MOBILE_STATUS = investorObj.uccMobileStatus;
        const REQ_TYPE = investorObj.uccRequestType;
        const LINK_EXPIRY = REQ_TYPE == UCC_REQUEST_TYPES.EXISTING ? `${parseInt(investorObj.totalAttempts) * 24}h` : `24h`
        const token = jwt.sign({ mobile: investorObj.uccMobileNo, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, { expiresIn: LINK_EXPIRY });
        const ref = `${process.env.FEHOST}/investor/mobile-verification/${investorObj.uccRequestId}/${token}`
        const shortURI = commonFunctions.createShortNer(ref);
        if (!MOBILE_STATUS) {
            commonFunctions.sendSMS(investorObj, shortURI, (err, res, body) => {
                const response = body.split('|')[0];
                if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.mobileProcessed = true;
                console.log(response, ">>>>>>>>>", investorObj.uccMobileNo);
                if (response == '1701') {
                    let noMobileAttempts = parseInt(investorObj.mobileAttempts);
                    noMobileAttempts = noMobileAttempts + 1;
                    investorObj.mobileAttempts = noMobileAttempts;
                    investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                } else {
                    investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                }
                resolve(investorObj);
            });
        } else {
            if (MOBILE_STATUS == MOBILE_STATUSES.SENT) {
                if (investorObj.mobileAttempts >= investorObj.totalAttempts) {
                    investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
                    investorObj.mobileProcessed = true;
                    investorObj.uccUpdatedAt = Number(new Date());
                    resolve(investorObj);
                } else {
                    if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) {
                        investorObj.mobileAttempts++;
                        resolve(investorObj);
                    }
                    else {
                        commonFunctions.sendSMS(investorObj, shortURI, (err, res, body) => {
                            if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.mobileProcessed = true;
                            const response = body.split('|')[0];
                            console.log(response, ">>>>>>>>>", investorObj.uccMobileNo);
                            if (response == "1701") {
                                let noMobileAttempts = parseInt(investorObj.mobileAttempts);
                                noMobileAttempts = noMobileAttempts + 1;
                                investorObj.mobileAttempts = noMobileAttempts;
                                investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                            } else {
                                investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                            }
                            resolve(investorObj);
                        });
                    }
                }
            }

            if (MOBILE_STATUS == MOBILE_STATUSES.VERIFIED || MOBILE_STATUS == MOBILE_STATUSES.REJECTED || MOBILE_STATUS == MOBILE_STATUSES.NOT_VERIFIED || MOBILE_STATUS == MOBILE_STATUSES.NOT_APPLICABLE || MOBILE_STATUS == MOBILE_STATUSES.INVALID || MOBILE_STATUS == MOBILE_STATUSES.HOLD || MOBILE_STATUS == MOBILE_STATUSES.LINK_EXPIRED) resolve(investorObj);
        }
    });
}

module.exports = {
    processInvestorEmailV3,
    processInvestorMobileV3

}



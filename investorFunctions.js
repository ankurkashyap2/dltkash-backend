const commonFunctions = require('./commonFunctions');
const jwt = require('jsonwebtoken');
const pug = require('pug');
const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./constants');
const { EMAIL_STATUSES, MOBILE_STATUSES, UCC_REQUEST_TYPES, COUNTRY_ARRAY } = require('./constants');
// const sendInvestorMail = async (email, res) => {

//     // send on blockchain for querying data if user exists or not ..
//     //assuming user exists ..
//     //check if user email is not verified .. then send email
//     let token = jwt.sign({ email: email }, process.env.JWTSECRET, {
//         expiresIn: '24h',
//     });
//     const mailBody = {
//         email: email,
//         ref: `${process.env.FEHOST}/investor/email-verification/${token}`
//     }
//     const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
//     commonFunctions.sendMail(email, 'Investor Email Verify', html, (err, response) => {
//         if (err)
//         // mail send failure system ....
//         {
//             if (res)
//                 return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: "Error sending mail" });
//         }
//         else return;
//     });
//     // attempts to be send on blockchain update ....

// }


// const processInvestorEmail = async (investorObj,) => {
//     return new Promise((resolve, reject) => {
//         const EMAIL_STATUS = investorObj.uccEmailStatus.toUpperCase();
//         if (EMAIL_STATUS != EMAIL_STATUSES.VERIFIED) {
//             if (!commonFunctions.validateEmail(investorObj.uccEmailId)) {
//                 investorObj.uccEmailStatus = EMAIL_STATUSES.INVALID;
//                 investorObj.emailProcessed = 'true';
//                 resolve(investorObj)

//             }
//             else {

//                 if (investorObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.NEW && parseInt(investorObj.emailAttempts.toString()) >= parseInt(investorObj.totalAttempts ?? '15')) {           //check if request type and email attempts
//                     investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
//                     investorObj.emailProcessed = 'true';
//                     resolve(investorObj);

//                 } else if (investorObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.EXISTING && parseInt(investorObj.emailAttempts.toString()) >= parseInt(investorObj.totalAttempts ?? '15')) {
//                     investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
//                     investorObj.emailProcessed = 'true';
//                     resolve(investorObj);
//                 }
//                 else { //send mail 

//                     let token = jwt.sign({ email: investorObj.uccEmailId, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, {
//                         expiresIn: '24h',
//                     });
//                     const mailBody = {
//                         email: investorObj.uccEmailId,
//                         ref: `${process.env.FEHOST}/investor/email-verification/${investorObj.uccRequestId}/${token}`,
//                         investorObj: investorObj
//                     }

//                     const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
//                     return commonFunctions.sendMail(investorObj.uccEmailId, 'Verification of e-mail ID linked to your UCC', html, (err, res, body) => {
//                         if (err) {
//                             // handle email error
//                             console.log(err)
//                         }
//                         else {
//                             // add mail attempts
//                             console.log('MAIL TO:--> ', investorObj.uccEmailId)
//                             if (!investorObj.emailAttempts) {
//                                 investorObj.emailAttempts = '1';
//                             }
//                             else {
//                                 let noEmailAttempts = parseInt(investorObj.emailAttempts);
//                                 noEmailAttempts = noEmailAttempts + 1;
//                                 investorObj.emailAttempts = noEmailAttempts.toString();

//                             }
//                             investorObj.uccEmailStatus = EMAIL_STATUSES.SENT
//                             investorObj.emailProcessed = 'true';
//                             resolve(investorObj)

//                         }
//                     })
//                 }
//             }
//         } else {
//             if (EMAIL_STATUS == EMAIL_STATUSES.VERIFIED) {
//                 investorObj.emailProcessed = 'true';
//                 resolve(investorObj);
//             }
//         }
//     })
// }





inv = {
    "uccRequestId": "234718212902",
    "uccTmId": "98234921",
    "uccTmName": "Zerodha",
    "uccPanExempt": "false",
    "uccPanNo": "COMPA44565A",
    "uccCountry": "India",
    "uccMobileNo": "9877114806",
    "uccEmailId": "agetnada.com",
    "uccDpId": "2384092431",
    "uccClientId": "82340918043",
    "uccInvestorCode": "18293",
    "uccRequestType": "EXISTING",
    // "uccNodeStatus": "01",
    "uccEmailStatus": "SENT",
    // "uccMobileStatus": "VERIFIED",
    // "uccPanStatus": "VERIFIED",
    "emailAttempts": 7,
    // "mobileAttempts": 2,
    "totalAttempts": 7,
    // "UTCNotification": "15:00"
}


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
        let token = jwt.sign({ email: investorObj.uccEmailId, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, { expiresIn: LINK_EXPIRY});
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
                    commonFunctions.sendMail(investorObj.uccEmailId, 'Verification of e-mail ID linked to your UCC', html, (err, res, body) => {

                        if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.emailProcessed = true;

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
            if (EMAIL_STATUS == EMAIL_STATUSES.VERIFIED || EMAIL_STATUS == EMAIL_STATUSES.REJECTED || EMAIL_STATUS == EMAIL_STATUSES.NOT_VERIFIED || EMAIL_STATUS == EMAIL_STATUSES.NOT_APPLICABLE || EMAIL_STATUS == EMAIL_STATUSES.INVALID || EMAIL_STATUS == EMAIL_STATUSES.HOLD || EMAIL_STATUS == EMAIL_STATUSES.LINK_EXPIRED) resolve(investorObj);
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

                    commonFunctions.sendSMS(investorObj, shortURI, (err, res, body) => {
                        if (REQ_TYPE == UCC_REQUEST_TYPES.EXISTING) investorObj.mobileProcessed = true;
                        const response = body.split('|')[0];
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

            if (MOBILE_STATUS == MOBILE_STATUSES.VERIFIED || MOBILE_STATUS == MOBILE_STATUSES.REJECTED || MOBILE_STATUS == MOBILE_STATUSES.NOT_VERIFIED || MOBILE_STATUS == MOBILE_STATUSES.NOT_APPLICABLE || MOBILE_STATUS == MOBILE_STATUSES.INVALID || MOBILE_STATUS == MOBILE_STATUSES.HOLD || MOBILE_STATUS == MOBILE_STATUSES.LINK_EXPIRED) resolve(investorObj);
        }
    });
}



// const processInvestorMobile = async (investorObj) => {
//     return new Promise((resolve, reject) => {
//         const MOBILE_STATUS = investorObj.uccMobileStatus.toUpperCase();

//         if (MOBILE_STATUS != MOBILE_STATUSES.VERIFIED) {
//             if (!commonFunctions.validateMobile(investorObj.uccMobileNo)) {
//                 investorObj.uccMobileStatus = MOBILE_STATUSES.INVALID;
//                 investorObj.mobileProcessed = 'true';
//                 resolve(investorObj)
//             }  //if valid  
//             else {
//                 if (investorObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.NEW && parseInt(investorObj.mobileAttempts.toString()) >= parseInt(investorObj.totalAttempts ?? '15')) {
//                     investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
//                     investorObj.mobileProcessed = 'true';
//                     resolve(investorObj);

//                 } else if (investorObj.uccRequestType.toUpperCase() == UCC_REQUEST_TYPES.EXISTING && parseInt(investorObj.mobileAttempts.toString()) >= parseInt(investorObj.totalAttempts ?? '15')) {
//                     investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
//                     investorObj.mobileProcessed = 'true';
//                     resolve(investorObj);
//                 }
//                 else { //send mail 
//                     const token = jwt.sign({ mobile: investorObj.uccMobileNo, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, {
//                         expiresIn: '24h',
//                     });

//                     const ref = `${process.env.FEHOST}/investor/mobile-verification/${investorObj.uccRequestId}/${token}`
//                     const shortURI = commonFunctions.createShortNer(ref);
//                     commonFunctions.sendSMS(investorObj, shortURI, (err, res, body) => {
//                         const response = body.split('|')[0];
//                         // add mail attempts
//                         console.log('send>>>>', response, investorObj.uccMobileNo)
//                         if (response == '1701') {
//                             if (!investorObj.mobileAttempts) {
//                                 investorObj.mobileAttempts = "1";
//                             }
//                             else {
//                                 let noMobileAttempts = parseInt(investorObj.mobileAttempts);
//                                 noMobileAttempts = noMobileAttempts + 1;
//                                 investorObj.mobileAttempts = noMobileAttempts.toString();
//                             }
//                             investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
//                             investorObj.mobileProcessed = 'true';
//                             resolve(investorObj)
//                         } else {
//                             investorObj.mobileProcessed = 'true';
//                             resolve(investorObj)
//                         }
//                     });
//                 }
//             }
//         } if (MOBILE_STATUS == MOBILE_STATUSES.VERIFIED) {
//             investorObj.mobileProcessed = 'true';
//             resolve(investorObj);
//         }
//     })
// }








module.exports = {
    // sendInvestorMail,
    // processInvestorEmail,
    // processInvestorMobile,
    // processInvestorMobileV2
    processInvestorEmailV3,
    processInvestorMobileV3

}



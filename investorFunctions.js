const commonFunctions = require('./commonFunctions');
const jwt = require('jsonwebtoken');
const pug = require('pug');
const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./constants');
const { EMAIL_STATUSES, MOBILE_STATUSES, UCC_REQUEST_TYPES, COUNTRY_ARRAY } = require('./constants');
const mongoose = require("mongoose");
const request = require('request');
const { decryptWithAES, encryptWithAES } = require('./commonFunctions');
const sendInvestorMail = async (email, res) => {

    // send on blockchain for querying data if user exists or not ..
    //assuming user exists ..
    //check if user email is not verified .. then send email
    let token = jwt.sign({ email: email }, process.env.JWTSECRET, {
        expiresIn: '24h',
    });
    const mailBody = {
        email: email,
        ref: `${process.env.FEHOST}/investor/email-verification/${token}`
    }
    const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
    commonFunctions.sendMail(email, 'Investor Email Verify', html, (err, response) => {
        if (err)
        // mail send failure system ....
        {
            if (res)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: "Error sending mail" });
        }
        else return;
    });
    // attempts to be send on blockchain update ....

}


const processInvestorEmail = async (investorObj) => {
    return new Promise((resolve, reject) => {

        const EMAIL_STATUS = investorObj.uccEmailStatus.toUpperCase();
        //check if user is verified or not
        // if user verified do nothing
        // if not verified ..
        // if (investorObj.isEmailEncrypted == 'true') {
        //     investorObj.isEmailEncrypted = 'false'
        //     var decryptedEmailId = decryptWithAES(investorObj.uccEmailId);
        //     investorObj.uccEmailId = decryptedEmailId
        // }

        if (EMAIL_STATUS != EMAIL_STATUSES.VERIFIED) {

            // if email not validated set email status as invalid
            if (!commonFunctions.validateEmail(investorObj.uccEmailId)) {
                investorObj.uccEmailStatus = EMAIL_STATUSES.INVALID;
                resolve(investorObj)

            }  //if valid  
            else {

                if (investorObj.uccRequestType == UCC_REQUEST_TYPES.NEW && investorObj.emailAttempts == '3') {           //check if request type and email attempts
                    investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
                    // if (investorObj.isEmailEncrypted == 'false') {
                    //     investorObj.isEmailEncrypted = 'true';
                    //     investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
                    // }
                    resolve(investorObj);

                } else if (investorObj.uccRequestType == UCC_REQUEST_TYPES.EXISTING && investorObj.emailAttempts == '15') {
                    investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
                    // if (investorObj.isEmailEncrypted == 'false') {
                    //     investorObj.isEmailEncrypted = 'true';
                    //     investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
                    // }
                    resolve(investorObj);
                }
                else { //send mail 

                    let token = jwt.sign({ email: investorObj.uccEmailId, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, {
                        expiresIn: '24h',
                    });
                    const mailBody = {
                        email: investorObj.uccEmailId,
                        ref: `${process.env.FEHOST}/investor/email-verification/${investorObj.uccRequestId}/${token}`
                    }

                    const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
                    commonFunctions.sendMail(investorObj.uccEmailId, 'Investor Email Verify', html, (err, res, body) => {
                        if (err) {
                            // handle email error
                            console.log(err)
                        }
                        else {
                            // add mail attempts
                            console.log('MAIL TO:--> ', investorObj.uccEmailId)
                            if (!investorObj.emailAttempts) {
                                investorObj.emailAttempts = '1';
                            }
                            else {
                                let noEmailAttempts = parseInt(investorObj.emailAttempts);
                                noEmailAttempts = noEmailAttempts + 1;
                                investorObj.emailAttempts = noEmailAttempts.toString();

                            }
                            investorObj.uccEmailStatus = EMAIL_STATUSES.SENT
                            // if (investorObj.isEmailEncrypted == 'false') {
                            //     investorObj.isEmailEncrypted = 'true';
                            //     investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
                            // }
                            // return investorObj;
                            resolve(investorObj)

                        }
                    })
                }
            }
        } else {
            if (EMAIL_STATUS == EMAIL_STATUSES.VERIFIED) {
                resolve(investorObj);
            }
        }
    })
}

const processInvestorMobile = async (investorObj) => {
    return new Promise((resolve, reject) => {
        const MOBILE_STATUS = investorObj.uccMobileStatus.toUpperCase();
        //check if user is verified or not
        // if user verified do nothing
        // if not verified ..

        // if (investorObj.isPhoneEncrypted == 'true') {
        //     investorObj.isPhoneEncrypted = 'false'
        //     var decryptedPhoneNo = decryptWithAES(investorObj.uccMobileNo);
        //     investorObj.uccMobileNo = decryptedPhoneNo
        // }
        if (MOBILE_STATUS != MOBILE_STATUSES.VERIFIED) {
            // if email not validated set email status as invalid
            if (!commonFunctions.validateMobile(investorObj.uccMobileNo)) {
                investorObj.uccMobileStatus = MOBILE_STATUSES.INVALID;
                // if (investorObj.isPhoneEncrypted == 'false') {
                //     investorObj.isPhoneEncrypted = 'true';
                //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                // }

                resolve(investorObj)

            }  //if valid  

            else {

                if (investorObj.uccRequestType == UCC_REQUEST_TYPES.NEW && investorObj.mobileAttempts == '3') {
                    //check if request type and email attempts
                    investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
                    // if (investorObj.isPhoneEncrypted == 'false') {
                    //     investorObj.isPhoneEncrypted = 'true';
                    //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                    // }
                    resolve(investorObj);

                } else if (investorObj.uccRequestType == UCC_REQUEST_TYPES.EXISTING && investorObj.mobileAttempts == '15') {
                    investorObj.uccMobileStatus = MOBILE_STATUSES.NOT_VERIFIED;
                    resolve(investorObj);
                }
                else { //send mail 
                    const token = jwt.sign({ mobile: investorObj.uccMobileNo, reqId: investorObj.uccRequestId }, process.env.JWTSECRET, {
                        expiresIn: '24h',
                    });

                    const ref = `${process.env.FEHOST}/investor/mobile-verification/${investorObj.uccRequestId}/${token}`
                    const shortURI = commonFunctions.createShortNer(ref);
                    commonFunctions.sendSMS(investorObj, shortURI, (err, res, body) => {
                        const response = body.split('|')[0];
                        // add mail attempts
                        console.log('send>>>>', response, investorObj.uccMobileNo)
                        if (response == '1701') {
                            if (!investorObj.mobileAttempts) {
                                investorObj.mobileAttempts = "1";
                            }
                            else {
                                let noMobileAttempts = parseInt(investorObj.mobileAttempts);
                                noMobileAttempts = noMobileAttempts + 1;
                                investorObj.mobileAttempts = noMobileAttempts.toString();
                            }
                            investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                            // if (investorObj.isPhoneEncrypted == 'false') {
                            //     investorObj.isPhoneEncrypted = 'true';
                            //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                            // }
                            resolve(investorObj)
                        } else {
                            // if (investorObj.isPhoneEncrypted == 'false') {
                            //     investorObj.isPhoneEncrypted = 'true';
                            //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                            // }
                            resolve(investorObj)
                        }
                    })
                    // commonFunctions.shortURL(ref, function (err, short) {
                    //     if (err) console.error(err)
                    //     commonFunctions.sendSMS(investorObj, short, (err, res, body) => {
                    //         const response = body.split('|')[0];
                    //         // add mail attempts
                    //         console.log('send>>>>', response, investorObj.uccMobileNo)
                    //         if (response == '1701') {
                    //             if (!investorObj.mobileAttempts) {
                    //                 investorObj.mobileAttempts = "1";
                    //             }
                    //             else {
                    //                 let noMobileAttempts = parseInt(investorObj.mobileAttempts);
                    //                 noMobileAttempts = noMobileAttempts + 1;
                    //                 investorObj.mobileAttempts = noMobileAttempts.toString();
                    //             }
                    //             investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
                    //             // if (investorObj.isPhoneEncrypted == 'false') {
                    //             //     investorObj.isPhoneEncrypted = 'true';
                    //             //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                    //             // }
                    //             resolve(investorObj)
                    //         } else {
                    //             // if (investorObj.isPhoneEncrypted == 'false') {
                    //             //     investorObj.isPhoneEncrypted = 'true';
                    //             //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
                    //             // }
                    //             resolve(investorObj)
                    //         }
                    //     })
                    // });
                }
            }
        } if (MOBILE_STATUS == MOBILE_STATUSES.VERIFIED) {
            resolve(investorObj);
        }
    })
}

// const operateInvestorsObject = async (investorObjArr) => {
//     let investorProcessedArr = [];

//     for await (let investorObject of investorObjArr) {
//         // console.log(investorObject.uccEmailId)
//         var investorEmailProcessedObj = await processInvestorEmail(investorObject);
//         var investorMobileProcessedObj = await processInvestorMobile(investorEmailProcessedObj);
//         if (!investorMobileProcessedObj.uiD)
//             investorMobileProcessedObj.uiD = new mongoose.Types.ObjectId();
//         investorProcessedArr.push(investorMobileProcessedObj);
//     }
//     // console.log(`sent to blockchain!>>>>>>>>>>>>>>> records length ${investorProcessedArr}`)

//     var options = {
//         'method': 'POST',
//         'url': 'http://localhost:3003/api/v1/exchange/verifyRequest',
//         'headers': {
//             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYzJAZ2V0bmFkYS5jb20iLCJ1c2VyX2lkIjoiNjFmYjdiZWIwOTI3YTY2Y2RiNDFjMjhkIiwiaWF0IjoxNjQ0MTU4MTE4LCJleHAiOjE2NDQyNDQ1MTh9.7q09YsORl20yQbzyMTEJgPMi2XCi6jaJSXWajrmaAeU',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "investorsData": investorProcessedArr
//         })

//     };
//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         console.log(response.body);
//     });

// }

// const operateInvestorsObject = async (investorObj) => {
//     return new Promise((resolve, reject) => {

//         const EMAIL_STATUS = investorObj.uccEmailStatus.toUpperCase();
//         const MOBILE_STATUS = investorObj.uccMobileStatus.toUpperCase();
//         //check if user is verified or not
//         // if user verified do nothing
//         // if not verified ..
//         if (investorObj.isEmailEncrypted == 'true') {
//             investorObj.isEmailEncrypted = 'false'
//             var decryptedEmailId = decryptWithAES(investorObj.uccEmailId);
//             investorObj.uccEmailId = decryptedEmailId
//         }
//         if (investorObj.isPhoneEncrypted == 'true') {
//             investorObj.isPhoneEncrypted = 'false'
//             var decryptedPhoneNo = decryptWithAES(investorObj.uccMobileNo);
//             investorObj.uccMobileNo = decryptedPhoneNo
//         }

//         if (EMAIL_STATUS != EMAIL_STATUSES.VERIFIED) {

//             // if email not validated set email status as invalid
//             if (!commonFunctions.validateEmail(investorObj.uccEmailId)) {
//                 investorObj.uccEmailStatus = EMAIL_STATUSES.INVALID;
//                 resolve(investorObj)

//             }  //if valid  
//             else {

//                 if (investorObj.uccRequestType == UCC_REQUEST_TYPES.NEW && investorObj.emailAttempts == '3') {           //check if request type and email attempts
//                     investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
//                     if (investorObj.isEmailEncrypted == 'false') {
//                         investorObj.isEmailEncrypted = 'true';
//                         investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
//                     }
//                     resolve(investorObj);

//                 } else if (investorObj.uccRequestType == UCC_REQUEST_TYPES.EXISTING && investorObj.emailAttempts == '15') {
//                     investorObj.uccEmailStatus = EMAIL_STATUSES.NOT_VERIFIED;
//                     if (investorObj.isEmailEncrypted == 'false') {
//                         investorObj.isEmailEncrypted = 'true';
//                         investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
//                     }
//                     resolve(investorObj);
//                 }
//                 else { //send mail 

//                     let token = jwt.sign({ email: investorObj.uccEmailId, reqId: investorObj.uccRequestId }, 'process.env.JWTSECRET', {
//                         expiresIn: '24h',
//                     });
//                     const mailBody = {
//                         email: investorObj.uccEmailId,
//                         ref: `${process.env.FEHOST}/investor/email-verification/${investorObj.uccRequestId}/${token}`
//                     }

//                     // const html = pug.renderFile(__root + "emailTemplates/investorEmailVerificaton.pug", mailBody);
//                     commonFunctions.sendMail(investorObj.uccEmailId, 'Investor Email Verify', 'html', (err, res, body) => {
//                         if (err) {
//                             // handle email error
//                             console.log(err)
//                         }
//                         else {
//                             // add mail attempts

//                             if (!investorObj.emailAttempts) {
//                                 investorObj.emailAttempts = '1';
//                             }
//                             else {
//                                 let noEmailAttempts = parseInt(investorObj.emailAttempts);
//                                 noEmailAttempts = noEmailAttempts + 1;
//                                 investorObj.emailAttempts = noEmailAttempts.toString();

//                             }
//                             investorObj.uccEmailStatus = EMAIL_STATUSES.SENT
//                             if (investorObj.isEmailEncrypted == 'false') {
//                                 investorObj.isEmailEncrypted = 'true';
//                                 investorObj.uccEmailId = encryptWithAES(investorObj.uccEmailId)
//                             }
//                             // return investorObj;
//                             resolve(investorObj)

//                         }
//                     })
//                 }
//             }
//         } else {
//             if (EMAIL_STATUS == EMAIL_STATUSES.VERIFIED) {
//                 resolve(investorObj);
//             }
//         }
//     })
// }



module.exports = {
    sendInvestorMail,
    processInvestorEmail,
    processInvestorMobile
}


// SHORT URL +++++ SENDSMS >>>>>>>>

// commonFunctions.shortURL(ref, function (err, short) {
//     if (err) console.error(err)
//     commonFunctions.sendSMS(investorObj, short, (err, res, body) => {
//         const response = body.split('|')[0];
//         // add mail attempts
//         console.log('send>>>>', response, investorObj.uccMobileNo)
//         if (response == '1701') {
//             if (!investorObj.mobileAttempts) {
//                 investorObj.mobileAttempts = "1";
//             }
//             else {
//                 let noMobileAttempts = parseInt(investorObj.mobileAttempts);
//                 noMobileAttempts = noMobileAttempts + 1;
//                 investorObj.mobileAttempts = noMobileAttempts.toString();
//             }
//             investorObj.uccMobileStatus = MOBILE_STATUSES.SENT
//             // if (investorObj.isPhoneEncrypted == 'false') {
//             //     investorObj.isPhoneEncrypted = 'true';
//             //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
//             // }
//             resolve(investorObj)
//         } else {
//             // if (investorObj.isPhoneEncrypted == 'false') {
//             //     investorObj.isPhoneEncrypted = 'true';
//             //     investorObj.uccMobileNo = encryptWithAES(investorObj.uccMobileNo)
//             // }
//             resolve(investorObj)
//         }
//     })
// });
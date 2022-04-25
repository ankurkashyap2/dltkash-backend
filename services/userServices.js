
const commonFunctions = require('../commonFunctions');
const { generateToken, verifyPassword } = require("../auth/verifyToken");
const User = require('./../models/user');
const { RESPONSE_STATUS, RESPONSE_MESSAGES } = require('../constants');
const exchange = require('../models/exchange');
const user = require('./../models/user');
const pug = require('pug')
const jwt = require('jsonwebtoken');
const request = require('request');
const s3services = require('./s3Services');
const mongoose = require('mongoose');
const loginUser = async (req, res) => {
    try {
        const { user_id } = await verifyPassword(req.body);
        var token = generateToken({ request: req.body, user_id, });
        return res.status(RESPONSE_STATUS.SUCCESS).json({ message: RESPONSE_MESSAGES.SUCCESS, token: token });
    } catch (error) {
        const error_body = {
            error_message: "Error while login user",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const askedUser = await user.findOne({ _id: req.user_id });
        if (!askedUser.loggedIn) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: 'User is already logged out.' });
        askedUser.loggedIn = false;
        askedUser.save()
        return res.status(RESPONSE_STATUS.SUCCESS).json({ message: RESPONSE_MESSAGES.SUCCESS });
    } catch (error) {
        const error_body = {
            error_message: "Error while logout user",
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

const registerExchange = async (req, res) => {
    try {
        const { legalEntityName, sebiCertificateNumber, cinNumber, panNumber, phoneNo, isFirstExchangeAdmin, userName, email, password } = req.body;
        var panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (!panRegex.test(panNumber)) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: 'Invalid Pan Number' });
        const documentLinks = {};
        var allFiles = true;
        if (!allFiles) return res.json({ message: 'All documents required' }).status(RESPONSE_STATUS.BAD_REQUEST);
        for await (var file of req.files) {
            const filename = legalEntityName + '-' + file.originalname;

            const fileLink = await s3services.fileUpload('exchanges', filename, file.buffer);
            console.log(fileLink)
            documentLinks[file.fieldname] = fileLink;
            //s3 upload
        }
        const exchangeObject = {
            legalEntityName: legalEntityName,
            sebiCertificateNumber: sebiCertificateNumber,
            cinNumber: cinNumber,
            panNumber: panNumber,
            documentLinks: documentLinks,
        }

        const [emailRegistered, panRegistered, mobileRegistered, userNameRegistered] = await Promise.all([
            User.findOne({ email: email }),
            User.findOne({ panNumber: panNumber }),
            User.findOne({ phoneNo: phoneNo }),
            User.findOne({ userName: userName }),
        ]);
        if (emailRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        if (panRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PAN_ALREADY_REGISTERED });
        if (mobileRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PHONE_ALREADY_REGISTERED });
        if (userNameRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.USERNAME_REGISTERED });
        const exchangeObj = await exchange.create(exchangeObject);
        const adminObj = {
            userName: userName,
            email: email,
            isFirstExchangeAdmin: isFirstExchangeAdmin,//true for first entry admin-- false for others
            exchangeId: exchangeObj._id,
            isEmailVerified: true,
            isExchangeAdmin: true,
            password: commonFunctions.encryptString(password),
            phoneNo: phoneNo,
        }
        const adminObject = await User.create(adminObj);
        const mailBody = {}
        const html = pug.renderFile(__root + "/emailTemplates/regsuccess.pug", mailBody);
        commonFunctions.sendMail(email, "Regarding Registration Success", html, (err, response) => {
            console.log(response.body, 'REGISTRATION SUCCESS MAIL>>>');
            if (err)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });

        });
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data: { exchangeObject: exchangeObj, adminObject: adminObject } });
    } catch (error) {
        const error_body = {
            error_message: "Error while Registering exchange",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}


const addExchangeAdmin = async (req, res) => {
    try {
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        const { phoneNo, userName, email, isFirstExchangeAdmin, password, role } = req.body;
        const [emailRegistered, mobileRegistered, userNameRegistered] = await Promise.all([
            User.findOne({ email: email }),

            User.findOne({ phoneNo: phoneNo }),
            User.findOne({ userName: userName }),
        ]);
        if (emailRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        if (mobileRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PHONE_ALREADY_REGISTERED });
        if (userNameRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: "Username already registered" });
        const adminObj = {
            userName: userName,
            email: email,
            isFirstExchangeAdmin: isFirstExchangeAdmin,//true for first entry admin-- false for others
            exchangeId: askedUser.exchangeId,
            role: role,
            password: commonFunctions.encryptString(password),
            phoneNo: phoneNo,
        }
        const mailBody = {
            userName: userName,
            email: email,
            password: password
        }
        const html = pug.renderFile(__root + "/emailTemplates/adminRegister.pug", mailBody);
        commonFunctions.sendMail(email, "Regarding Registration On DLTKASH", html, (err, response) => {
            console.log(response.body, 'REGISTRATION SUCCESS MAIL>>>');
            if (err)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });

        });
        const adminObject = await User.create(adminObj);
        return res.json({ data: adminObject, message: RESPONSE_MESSAGES.SUCCESS });
    } catch (error) {
        const error_body = {
            error_message: "Error while adding exchange Admin",
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

const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const askedUser = await User.findOne({ email: req.email });
        if (!askedUser)
            return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.USER_NOT_VERIFIED_OR_DOES_NOT_EXISTS });
        if (askedUser.reset_password)
            return res.status(RESPONSE_STATUS.GONE).json({ message: RESPONSE_MESSAGES.LINK_EXPIRED });
        askedUser.password = commonFunctions.encryptString(password);
        askedUser.reset_password = true;
        askedUser.save().then(() => { });
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
    } catch (error) {
        const error_body = {
            error_message: "Error while resetting password",
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

const forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (!user) return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.EMAILL_NOT_REGISTERED });
        user.reset_password = false;
        user.save().then(() => { });
        req.body['user_id'] = user.id;
        const user_id = user.id
        let token = jwt.sign({ email: user.email, user_id }, process.env.JWTSECRET, {
            expiresIn: '24h',
        });
        const mailBody = {
            email: req.query.email, ref: `${process.env.FEHOST}/reset-password/${token}`
        }
        const html = pug.renderFile(__root + "/emailTemplates/passwordChange.pug", mailBody);
        commonFunctions.sendMail(req.query.email, "Regarding password change", html, (err, response) => {

            if (err)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });

        });
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS });
    } catch (error) {
        const error_body = {
            error_message: "Error while forgetting password",
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


const sendPlatformOtp = async (req, res) => {
    try {

        const phoneNo = req.query.mobile;
        if (!commonFunctions.validateMobile(phoneNo)) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not a valid Mobile Number" });
        const askedUser = await User.findOne({ phoneNo: phoneNo });
        if (askedUser) return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Phone No. already registered." });
        const otp = commonFunctions.getOTP();
        const encryptedOTP = commonFunctions.encryptWithAES(otp.toString());
        const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=${process.env.RM_USERNAME || 'DL08-dltkash'}&password=${process.env.RM_PASS || 'dltkash@'}&type=0&dlr=1&destination=${phoneNo}&source=DLTKTP&message=Please%20confirm%20your%20mobile%20no.%20mapped%20with%20${phoneNo}%20by%20clicking%20on%20the%20${otp}%20-%20DLTKASH&entityid=1601156164334945695&tempid=1607100000000188213`;
        var options = {
            'method': 'GET',
            'url': dltSMS,
            'headers': {
                'Content-Type': 'application/json'
            },
        };

        request(options, (err, resp, body) => {
            const response = body.split('|')[0];
            // add mail attempts
            console.log('send>>>>', response)
            if (response == '1701') {
                return res.json({ message: "OTP SENT SUCCESS", verification: encryptedOTP });
            } else {
                return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Error", data: response })
            }
        });
    } catch (error) {
        const error_body = {
            error_message: "Error while send otp",
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

const getExchangeDetails = async (req, res) => {
    try {
        const askedExchange = await exchange.findOne({ _id: req.query.exchangeId });
        if (!askedExchange) return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.NOT_FOUND });
        return res.status(RESPONSE_STATUS.SUCCESS).json({ data: askedExchange });
    } catch (error) {
        const error_body = {
            error_message: "Error while getting exchange details",
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

const getAdminDetails = async (req, res) => {
    try {
        const askedAdmin = await User.findOne({ $or: [{ email: req.email }, { userName: req.email }] });
        return res.status(RESPONSE_STATUS.SUCCESS).json({ data: askedAdmin });
    } catch (error) {
        const error_body = {
            error_message: "Error while getting admin details",
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



const sendPlatformVerificationEmail = async (req, res) => {
    try {
        if (!commonFunctions.validateEmail(req.query.email)) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Bad email format. Please recheck your email !" });
        const user = await User.findOne({ email: req.query.email.toLowerCase() });
        if (user) return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        const otp = commonFunctions.getOTP();
        const mailBody = {
            email: req.query.email,
            otp: otp,
        }
        const html = pug.renderFile(__root + "emailTemplates/emailVerification.pug", mailBody);
        commonFunctions.sendMail(req.query.email, 'Regarding Email Verification', html, (err, response) => {
            // if(response.body.status != 'queued') return res.json(RESPONSE_MESSAGES.BAD_REQUEST).status({message:response.body.toString()})
            //handle code == -1
        });
        const enc = commonFunctions.encryptWithAES(otp.toString());
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS, enc: enc });

    } catch (error) {
        const error_body = {
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        }
        console.error(error.stack);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.stack });
    }

}

const fetchInvestorsByTimeStamp = async (req, res) => {
    try {

        
    } catch (error) {
        const error_body = {
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        }
        console.error(error.stack);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.stack });
    }
}


module.exports = {
    sendPlatformVerificationEmail,
    loginUser,
    registerExchange,
    addExchangeAdmin,
    fetchInvestorsByTimeStamp,
    resetPassword,
    forgetPassword,
    getAdminDetails,
    getExchangeDetails,
    sendPlatformOtp,
    logoutUser,

}
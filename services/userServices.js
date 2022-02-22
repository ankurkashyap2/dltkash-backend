
const commonFunctions = require('../commonFunctions');
const { generateToken, verifyPassword } = require("../auth/verifyToken");
const User = require('./../models/user');
const { RESPONSE_STATUS, RESPONSE_MESSAGES } = require('../constants');
const exchange = require('../models/exchange');
const user = require('./../models/user');
const pug = require('pug')
const jwt = require('jsonwebtoken');



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
        for (var file of req.files) {
            const filename = (new Date()).getTime() + '-' + file.originalname;
            documentLinks[file.fieldname] = filename;
            //s3 upload
        }
        const exchangeObject = {
            legalEntityName: legalEntityName,
            sebiCertificateNumber: sebiCertificateNumber,
            cinNumber: cinNumber,
            panNumber: panNumber,
            documentLinks: documentLinks,
        }

        const [emailRegistered, panRegistered, mobileRegistered] = await Promise.all([
            User.findOne({ email: email }),
            User.findOne({ panNumber: panNumber }),
            User.findOne({ phoneNo: phoneNo }),
        ]);
        if (emailRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        if (panRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PAN_ALREADY_REGISTERED });
        if (mobileRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PHONE_ALREADY_REGISTERED });
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
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data: { exchangeObject: exchangeObj, adminObject: adminObject } });
    } catch (error) {
        const error_body = {
            error_message: "Error while Registering exchange",
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


const addExchangeAdmin = async (req, res) => {
    try {
        const { phoneNo, userName, email, password, exchangeId, role } = req.body;
        const [emailRegistered, mobileRegistered] = await Promise.all([
            User.findOne({ email: email }),

            User.findOne({ phoneNo: phoneNo }),
        ]);
        if (emailRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        if (mobileRegistered) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: RESPONSE_MESSAGES.PHONE_ALREADY_REGISTERED });
        const adminObj = {
            userName: userName,
            email: email,
            isFirstExchangeAdmin: isFirstExchangeAdmin,//true for first entry admin-- false for others
            exchangeId: exchangeId,
            role: role,
            password: commonFunctions.encryptString(password),
            phoneNo: phoneNo,
        }
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
        if (!user) return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.EMAIL_NOT_REGISTERED });
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


const sendPlatformOtp = (req, res) => {
    try {
        
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
        const askedAdmin = await User.findOne({ email: req.email });
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

const verifyOtp = (req, res) => {
    try {
            
    } catch (error) {
        const error_body = {
            error_message: "Error while verify email",
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
            if (err)
                return res.status(RESPONSE_STATUS.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
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

module.exports = {
    sendPlatformVerificationEmail,
    loginUser,
    registerExchange,
    addExchangeAdmin,
    resetPassword,
    forgetPassword,
    getAdminDetails,
    getExchangeDetails,
    sendPlatformOtp,
    verifyOtp,

    logoutUser
}
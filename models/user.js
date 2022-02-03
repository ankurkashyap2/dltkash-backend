const mongoose = require("mongoose");
const { STATUS, ROLES } = require("../constants");
const User = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNo: { type: String },
    isFirstExchangeAdmin: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isDltKashAdmin: { type: Boolean, default: false },
    reset_password: { type: Boolean, default: false },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.ACTIVE
    },
    otp: { type: String },
    role: { type: String, enum: ROLES, default: ROLES.ADMIN },
    isExchangeAdmin: { type: Boolean, default: false },
    exchangeId: { type: mongoose.Schema.Types.ObjectId, ref: "Exchange" },
    isOperational: { type: String, default: false },
    loggedIn: { type: Boolean, default: false }
}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("User", User);
module.exports = mongoose.model("User");
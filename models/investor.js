const mongoose = require("mongoose");
const { NOTIFICATION_TEMPLATES_TYPES, STATUS } = require("../constants");
const Investor = new mongoose.Schema({
    panNumber: { type: String },
    isPanVerified: { type: Boolean },
    phoneNumber: { type: String },
    isPhoneVerified: { type: Boolean },
    email: { type: String },
    isEmailVerified: { type: Boolean },
    
}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("Investor", Investor);
module.exports = mongoose.model("Investor");
const mongoose = require("mongoose");
const { NOTIFICATION_TEMPLATES_TYPES, STATUS } = require("../constants");
const Exchange = new mongoose.Schema({
    legalEntityName: { type: String },
    sebiCertificateNumber: { type: String },
    cinNumber: { type: String },
    panNumber: { type: String },
    documentLinks: {
        sebiCertificate: { type: String },
        cinCertificate: { type: String },
        pan: { type: String },
        logo: { type: String }
    },

    newAttempts: { type: Number, default: 3 },
    modifiedAttempts: { type: Number, default: 7 },
    existingAttempts: { type: Number, default: 1 },
    existingDate: { type: Date },
    isExisitngDateSelected: { type: Boolean, default: false },
    notificationTemplates: [
        {
            html: { type: String },
            type: { type: String, enum: NOTIFICATION_TEMPLATES_TYPES, },
        }
    ],
    logo: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.ACTIVE
    },
    exchangeAdminIds: [
        {
            adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            status: { type: String, enum: STATUS, },
        }
    ]

}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("Exchange", Exchange);
module.exports = mongoose.model("Exchange");
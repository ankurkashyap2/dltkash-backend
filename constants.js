exports.STATUS = { ACTIVE: "ACTIVE", BLOCK: "BLOCK", DELETE: "DELETE" }
exports.NOTIFICATION_TEMPLATES_TYPES = { EMAIL: "EMAIL", SMS: "SMS" }

exports.RESPONSE_STATUS = {
    GONE: 410,
    CREATED: 201,
    SUCCESS: 200,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
};

exports.RESPONSE_MESSAGES = {
    LINK_EXPIRED: "Link Expired",
    SUCCESS: "Request Successful",
    OTP_VERIFIED: "Otp verify successfully",
    OTP_EXPIRED: "Otp expired",
    ALREADY_REGISTERED:"User already registered",
    INVALID_OTP: "Invalid Otp",
    USER_NOT_VERIFIED_OR_DOES_NOT_EXISTS: "User not verfied or does not exists",
    USER_NOT_VERIFIED: "User not verfied",
    CONFLICT: "Request Conflicted",
    PASS_MISMATCH: "Password not match",
    SERVER_ERROR: "Server error occured",
    NOT_VERIFIED: 'User not verified',
    NOT_FOUND: "Resource not found",
    TOKEN_NOT_FOUND: "No token provided.",
    TOKEN_SESSION: "User session expired, Please log in again!",
    PARAMETER_NOT_FOUND: "Parameter Missing",
    INVALID_CRED: "Invalid credentials",
    UNAUTHORIZED: "Request Unauthorized",
    PHONE_ALREADY_EXIST: "This Phone Number is already exists",
    EMAIL_ALREADY_EXIST: "This Email is already exists",
    EMAIL_ALREADY_REGISTERED: "Already Registered",
    EMAIL_NOT_REGISTERED: "Email Not Registered",
    EMAIL_SENT: "check updated email",
    BLOCKED_USER: "This user is inactive, Please contact to admin"

};
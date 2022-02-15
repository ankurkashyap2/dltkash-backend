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

exports.ROLES = {
    ADMIN: "ADMIN",
    OPERATIONAL: "OPERATIONAL"
},
    exports.RESPONSE_MESSAGES = {
        LINK_EXPIRED: "Link Expired",
        SUCCESS: "Request Successful",
        OTP_VERIFIED: "Otp verify successfully",
        OTP_EXPIRED: "Otp expired",
        ALREADY_REGISTERED: "User already registered",
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
        PHONE_ALREADY_REGISTERED: "This Phone Number is already registered",
        PAN_ALREADY_REGISTERED: "This PAN Number is already registered",
        EMAIL_ALREADY_REGISTERED: "Email Already Registered",
        EMAIL_NOT_REGISTERED: "Email Not Registered",
        EMAIL_SENT: "check updated email",
        BLOCKED_USER: "This user is inactive, Please contact to admin"

    };

exports.EMAIL_STATUSES = {
    SENT: "SENT",
    INVALID: "INVALID",
    LINK_EXPIRED: "LINK EXPIRED",
    VERIFIED: "VERIFIED",
    NOT_VERIFIED: "NOT VERIFIED"
};

exports.MOBILE_STATUSES = {
    SENT: "SENT",
    INVALID: "INVALID",
    LINK_EXPIRED: "LINK EXPIRED",
    VERIFIED: "VERIFIED",
    NOT_VERIFIED: "NOT VERIFIED"
};

exports.NODE_STATUSES = {
    NSE: "01",
    NSDL: "02"
}

exports.UCC_REQUEST_TYPES = {
    NEW: "NEW",
    EXISTING: "EXIST"
}

exports.UCC_PAN_EXEMPT = {
    PAN_PRESENT: "NO",
    PAN_ABSENT: "YES"
}

exports.MODIFIED = {
    YES: "YES",
    NO: "NO"
}

exports.TIMEZONES = {
    UTC: "13:00",
    ECT: "14:00",
    EET: "15:00",
    ART: "15:00",
    EAT: "16:00",
    MET: "17:00",                  // UTC + 3:30
    NET: "17:00",                  // UTC + 4:00
    PLT: "18:00",                  // UTC + 5:00
    IST: "18:00",                  // UTC + 6:00

}

exports.COUNTRYCODES = {
    AD: "Andorra",
    AE: "United Arab Emirates",
    AF: "Afghanistan",
    AG: "Antigua & Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "Samoa",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Aaland Islands",
    AZ: "Azerbaijan",
    BA: "Bosnia & Herzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgium",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "St Barthelemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Caribbean Netherlands",
    BR: "Brazil",
    BS: "Bahamas",
    BT: "Bhutan",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Cocos (Keeling) Islands",
    CD: "Congo (Dem. Rep.)",
    CF: "Central African Rep.",
    CG: "Congo (Rep.)",
    CH: "Switzerland",
    CI: "Cote d'Ivoire",
    CK: "Cook Islands",
    CL: "Chile",
    CM: "Cameroon",
    CN: "China",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Cape Verde",
    CW: "Curacao",
    CX: "Christmas Island",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DE: "Germany",
    DJ: "Djibouti",
    DK: "Denmark",
    DM: "Dominica",
    DO: "Dominican Republic",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egypt",
    EH: "Western Sahara",
    ER: "Eritrea",
    ES: "Spain",
    ET: "Ethiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falkland Islands",
    FM: "Micronesia",
    FO: "Faroe Islands",
    FR: "France",
    GA: "Gabon",
    GB: "Britain",
    GD: "Grenada",
    GE: "Georgia",
    GF: "French Guiana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Greenland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Equatorial Guinea",
    GR: "Greece",
    GS: "South Georgia & the South Sandwich Islands",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong",
    HN: "Honduras",
    HR: "Croatia",
    HT: "Haiti",
    HU: "Hungary",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "India",
    IO: "British Indian Ocean Territory",
    IQ: "Iraq",
    IR: "Iran",
    IS: "Iceland",
    IT: "Italy",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kyrgyzstan",
    KH: "Cambodia",
    KI: "Kiribati",
    KM: "Comoros",
    KN: "St Kitts & Nevis",
    KP: "Korea (North)",
    KR: "Korea (South)",
    KW: "Kuwait",
    KY: "Cayman Islands",
    KZ: "Kazakhstan",
    LA: "Laos",
    LB: "Lebanon",
    LC: "St Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Morocco",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "St Martin (French part)",
    MG: "Madagascar",
    MH: "Marshall Islands",
    MK: "Macedonia",
    ML: "Mali",
    MM: "Myanmar (Burma)",
    MN: "Mongolia",
    MO: "Macau",
    MP: "Northern Mariana Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldives",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mozambique",
    NA: "Namibia",
    NC: "New Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Netherlands",
    NO: "Norway",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "French Polynesia",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PK: "Pakistan",
    PL: "Poland",
    PM: "St Pierre & Miquelon",
    PN: "Pitcairn",
    PR: "Puerto Rico",
    PS: "Palestine",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russia",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SB: "Solomon Islands",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Sweden",
    SG: "Singapore",
    SH: "St Helena",
    SI: "Slovenia",
    SJ: "Svalbard & Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    SS: "South Sudan",
    ST: "Sao Tome & Principe",
    SV: "El Salvador",
    SX: "St Maarten",
    SY: "Syria",
    SZ: "Swaziland",
    TC: "Turks & Caicos Is",
    TD: "Chad",
    TF: "French Southern & Antarctic Lands",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tajikistan",
    TK: "Tokelau",
    TL: "East Timor",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turkey",
    TT: "Trinidad & Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraine",
    UG: "Uganda",
    UM: "US minor outlying islands",
    US: "United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Vatican City",
    VC: "St Vincent",
    VE: "Venezuela",
    VG: "Virgin Islands",
    VI: "Virgin Islands",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis & Futuna",
    WS: "Samoa",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "South Africa",
    ZM: "Zambia",
    ZW: "Zimbabwe",
}



exports.COUNTRY_ARRAY = [
    {
        "Name": "Afghanistan",
        "Code": "AF",
        "Timezone": "Afghanistan Standard Time",
        "UTC": "UTC+04:30",
        "MobileCode": "+93",
        "hours": "12:00"
    },
    {
        "Name": "Åland Islands",
        "Code": "AX",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+358-18",
        "hours": "14:00"
    },
    {
        "Name": "Albania",
        "Code": "AL",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+355",
        "hours": "15:00"
    },
    {
        "Name": "Algeria",
        "Code": "DZ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+213",
        "hours": "15:00"
    },
    {
        "Name": "American Samoa",
        "Code": "AS",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+1-684",
        "hours": "21:00"
    },
    {
        "Name": "Andorra",
        "Code": "AD",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+376",
        "hours": "15:00"
    },
    {
        "Name": "Angola",
        "Code": "AO",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+244",
        "hours": "15:00"
    },
    {
        "Name": "Anguilla",
        "Code": "AI",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-264",
        "hours": "14:00"
    },
    {
        "Name": "Antarctica",
        "Code": "AQ",
        "Timezone": "Pacific SA Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+",
        "hours": "13:00"
    },
    {
        "Name": "Antigua and Barbuda",
        "Code": "AG",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-268",
        "hours": "14:00"
    },
    {
        "Name": "Argentina",
        "Code": "AR",
        "Timezone": "Argentina Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+54",
        "hours": "13:00"
    },
    {
        "Name": "Armenia",
        "Code": "AM",
        "Timezone": "Caucasus Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+374",
        "hours": "12:00"
    },
    {
        "Name": "Aruba",
        "Code": "AW",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+297",
        "hours": "14:00"
    },
    {
        "Name": "Australia",
        "Code": "AU",
        "Timezone": "AUS Eastern Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+61",
        "hours": "6:00"
    },
    {
        "Name": "Austria",
        "Code": "AT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+43",
        "hours": "15:00"
    },
    {
        "Name": "Azerbaijan",
        "Code": "AZ",
        "Timezone": "Azerbaijan Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+994",
        "hours": "12:00"
    },
    {
        "Name": "Bahamas, The",
        "Code": "BS",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-242",
        "hours": "15:00"
    },
    {
        "Name": "Bahrain",
        "Code": "BH",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+973",
        "hours": "13:00"
    },
    {
        "Name": "Bangladesh",
        "Code": "BD",
        "Timezone": "Bangladesh Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+880",
        "hours": "10:00"
    },
    {
        "Name": "Barbados",
        "Code": "BB",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-246",
        "hours": "14:00"
    },
    {
        "Name": "Belarus",
        "Code": "BY",
        "Timezone": "Belarus Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+375",
        "hours": "13:00"
    },
    {
        "Name": "Belgium",
        "Code": "BE",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+32",
        "hours": "15:00"
    },
    {
        "Name": "Belize",
        "Code": "BZ",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+501",
        "hours": "16:00"
    },
    {
        "Name": "Benin",
        "Code": "BJ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+229",
        "hours": "15:00"
    },
    {
        "Name": "Bermuda",
        "Code": "BM",
        "Timezone": "Atlantic Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-441",
        "hours": "14:00"
    },
    {
        "Name": "Bhutan",
        "Code": "BT",
        "Timezone": "Bangladesh Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+975",
        "hours": "10:00"
    },
    {
        "Name": "Bolivarian Republic of Venezuela",
        "Code": "VE",
        "Timezone": "Venezuela Standard Time",
        "UTC": "UTC-04:30",
        "MobileCode": "+58",
        "hours": "14:00"
    },
    {
        "Name": "Bolivia",
        "Code": "BO",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+591",
        "hours": "14:00"
    },
    {
        "Name": "Bonaire, Sint Eustatius and Saba",
        "Code": "BQ",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    {
        "Name": "Bosnia and Herzegovina",
        "Code": "BA",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+387",
        "hours": "15:00"
    },
    {
        "Name": "Botswana",
        "Code": "BW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+267",
        "hours": "14:00"
    },
    {
        "Name": "Bouvet Island",
        "Code": "BV",
        "Timezone": "UTC",
        "UTC": "UTC",
        "MobileCode": "+",
        "hours": "22:00"
    },
    {
        "Name": "Brazil",
        "Code": "BR",
        "Timezone": "E. South America Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+55",
        "hours": "13:00"
    },
    {
        "Name": "British Indian Ocean Territory",
        "Code": "IO",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+246",
        "hours": "10:00"
    },
    {
        "Name": "Brunei",
        "Code": "BN",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+673",
        "hours": "8:00"
    },
    {
        "Name": "Bulgaria",
        "Code": "BG",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+359",
        "hours": "14:00"
    },
    {
        "Name": "Burkina Faso",
        "Code": "BF",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+226",
        "hours": "22:00"
    },
    {
        "Name": "Burundi",
        "Code": "BI",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+257",
        "hours": "14:00"
    },
    {
        "Name": "Cabo Verde",
        "Code": "CV",
        "Timezone": "Cape Verde Standard Time",
        "UTC": "UTC-01:00",
        "MobileCode": "+238",
        "hours": "11:00"
    },
    {
        "Name": "Cambodia",
        "Code": "KH",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+855",
        "hours": "9:00"
    },
    {
        "Name": "Cameroon",
        "Code": "CM",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+237",
        "hours": "15:00"
    },
    {
        "Name": "Canada",
        "Code": "CA",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1",
        "hours": "15:00"
    },
    {
        "Name": "Cayman Islands",
        "Code": "KY",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-345",
        "hours": "15:00"
    },
    {
        "Name": "Central African Republic",
        "Code": "CF",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+236",
        "hours": "15:00"
    },
    {
        "Name": "Chad",
        "Code": "TD",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+235",
        "hours": "15:00"
    },
    {
        "Name": "Chile",
        "Code": "CL",
        "Timezone": "Pacific SA Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+56",
        "hours": "13:00"
    },
    {
        "Name": "China",
        "Code": "CN",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+86",
        "hours": "8:00"
    },
    {
        "Name": "Christmas Island",
        "Code": "CX",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+61",
        "hours": "9:00"
    },
    {
        "Name": "Cocos (Keeling) Islands",
        "Code": "CC",
        "Timezone": "Myanmar Standard Time",
        "UTC": "UTC+06:30",
        "MobileCode": "+61",
        "hours": "10:00"
    },
    {
        "Name": "Colombia",
        "Code": "CO",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+57",
        "hours": "15:00"
    },
    {
        "Name": "Comoros",
        "Code": "KM",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+269",
        "hours": "13:00"
    },
    {
        "Name": "Congo",
        "Code": "CG",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+242",
        "hours": "15:00"
    },
    {
        "Name": "Congo (DRC)",
        "Code": "CD",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+243",
        "hours": "15:00"
    },
    {
        "Name": "Cook Islands",
        "Code": "CK",
        "Timezone": "Hawaiian Standard Time",
        "UTC": "UTC-10:00",
        "MobileCode": "+682",
        "hours": "20:00"
    },
    {
        "Name": "Costa Rica",
        "Code": "CR",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+506",
        "hours": "16:00"
    },
    {
        "Name": "Côte d'Ivoire",
        "Code": "CI",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+225",
        "hours": "22:00"
    },
    {
        "Name": "Croatia",
        "Code": "HR",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+385",
        "hours": "15:00"
    },
    {
        "Name": "Cuba",
        "Code": "CU",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+53",
        "hours": "15:00"
    },
    {
        "Name": "Curaçao",
        "Code": "CW",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    {
        "Name": "Cyprus",
        "Code": "CY",
        "Timezone": "E. Europe Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+357",
        "hours": "14:00"
    },
    {
        "Name": "Czech Republic",
        "Code": "CZ",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+420",
        "hours": "15:00"
    },
    {
        "Name": "Democratic Republic of Timor-Leste",
        "Code": "TL",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+670",
        "hours": "7:00"
    },
    {
        "Name": "Denmark",
        "Code": "DK",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+45",
        "hours": "15:00"
    },
    {
        "Name": "Djibouti",
        "Code": "DJ",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+253",
        "hours": "13:00"
    },
    {
        "Name": "Dominica",
        "Code": "DM",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-767",
        "hours": "14:00"
    },
    {
        "Name": "Dominican Republic",
        "Code": "DO",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-809 and 1-829",
        "hours": "14:00"
    },
    {
        "Name": "Ecuador",
        "Code": "EC",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+593",
        "hours": "15:00"
    },
    {
        "Name": "Egypt",
        "Code": "EG",
        "Timezone": "Egypt Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+20",
        "hours": "14:00"
    },
    {
        "Name": "El Salvador",
        "Code": "SV",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+503",
        "hours": "16:00"
    },
    {
        "Name": "Equatorial Guinea",
        "Code": "GQ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+240",
        "hours": "15:00"
    },
    {
        "Name": "Eritrea",
        "Code": "ER",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+291",
        "hours": "13:00"
    },
    {
        "Name": "Estonia",
        "Code": "EE",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+372",
        "hours": "14:00"
    },
    {
        "Name": "Ethiopia",
        "Code": "ET",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+251",
        "hours": "13:00"
    },
    {
        "Name": "Falkland Islands (Islas Malvinas)",
        "Code": "FK",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+500",
        "hours": "13:00"
    },
    {
        "Name": "Faroe Islands",
        "Code": "FO",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+298",
        "hours": "22:00"
    },
    {
        "Name": "Fiji Islands",
        "Code": "FJ",
        "Timezone": "Fiji Standard Time",
        "UTC": "UTC+12:00",
        "MobileCode": "+679",
        "hours": "4:00"
    },
    {
        "Name": "Finland",
        "Code": "FI",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+358",
        "hours": "14:00"
    },
    {
        "Name": "France",
        "Code": "FR",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+33",
        "hours": "15:00"
    },
    {
        "Name": "French Guiana",
        "Code": "GF",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+594",
        "hours": "13:00"
    },
    {
        "Name": "French Polynesia",
        "Code": "PF",
        "Timezone": "Hawaiian Standard Time",
        "UTC": "UTC-10:00",
        "MobileCode": "+689",
        "hours": "20:00"
    },
    {
        "Name": "French Southern and Antarctic Lands",
        "Code": "TF",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+",
        "hours": "11:00"
    },
    {
        "Name": "Gabon",
        "Code": "GA",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+241",
        "hours": "15:00"
    },
    {
        "Name": "Gambia, The",
        "Code": "GM",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+220",
        "hours": "22:00"
    },
    {
        "Name": "Georgia",
        "Code": "GE",
        "Timezone": "Georgian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+995",
        "hours": "12:00"
    },
    {
        "Name": "Germany",
        "Code": "DE",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+49",
        "hours": "15:00"
    },
    {
        "Name": "Ghana",
        "Code": "GH",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+233",
        "hours": "22:00"
    },
    {
        "Name": "Gibraltar",
        "Code": "GI",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+350",
        "hours": "15:00"
    },
    {
        "Name": "Greece",
        "Code": "GR",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+30",
        "hours": "14:00"
    },
    {
        "Name": "Greenland",
        "Code": "GL",
        "Timezone": "Greenland Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+299",
        "hours": "13:00"
    },
    {
        "Name": "Grenada",
        "Code": "GD",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-473",
        "hours": "14:00"
    },
    {
        "Name": "Guadeloupe",
        "Code": "GP",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    {
        "Name": "Guam",
        "Code": "GU",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+1-671",
        "hours": "6:00"
    },
    {
        "Name": "Guatemala",
        "Code": "GT",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+502",
        "hours": "16:00"
    },
    {
        "Name": "Guernsey",
        "Code": "GG",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1481",
        "hours": "22:00"
    },
    {
        "Name": "Guinea",
        "Code": "GN",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+224",
        "hours": "22:00"
    },
    {
        "Name": "Guinea-Bissau",
        "Code": "GW",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+245",
        "hours": "22:00"
    },
    {
        "Name": "Guyana",
        "Code": "GY",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+592",
        "hours": "14:00"
    },
    {
        "Name": "Haiti",
        "Code": "HT",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+509",
        "hours": "15:00"
    },
    {
        "Name": "Heard Island and McDonald Islands",
        "Code": "HM",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+ ",
        "hours": "12:00"
    },
    {
        "Name": "Honduras",
        "Code": "HN",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+504",
        "hours": "16:00"
    },
    {
        "Name": "Hong Kong SAR",
        "Code": "HK",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+852",
        "hours": "8:00"
    },
    {
        "Name": "Hungary",
        "Code": "HU",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+36",
        "hours": "15:00"
    },
    {
        "Name": "Iceland",
        "Code": "IS",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+354",
        "hours": "22:00"
    },
    {
        "Name": "India",
        "Code": "IN",
        "Timezone": "India Standard Time",
        "UTC": "UTC+05:30",
        "MobileCode": "+91",
        "hours": "11:00"
    },
    {
        "Name": "Indonesia",
        "Code": "ID",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+62",
        "hours": "9:00"
    },
    {
        "Name": "Iran",
        "Code": "IR",
        "Timezone": "Iran Standard Time",
        "UTC": "UTC+03:30",
        "MobileCode": "+98",
        "hours": "13:00"
    },
    {
        "Name": "Iraq",
        "Code": "IQ",
        "Timezone": "Arabic Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+964",
        "hours": "13:00"
    },
    {
        "Name": "Ireland",
        "Code": "IE",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+353",
        "hours": "22:00"
    },
    {
        "Name": "Israel",
        "Code": "IL",
        "Timezone": "Israel Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+972",
        "hours": "14:00"
    },
    {
        "Name": "Italy",
        "Code": "IT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+39",
        "hours": "15:00"
    },
    {
        "Name": "Jamaica",
        "Code": "JM",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-876",
        "hours": "15:00"
    },
    {
        "Name": "Jan Mayen",
        "Code": "SJ",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    {
        "Name": "Japan",
        "Code": "JP",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+81",
        "hours": "7:00"
    },
    {
        "Name": "Jersey",
        "Code": "JE",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1534",
        "hours": "22:00"
    },
    {
        "Name": "Jordan",
        "Code": "JO",
        "Timezone": "Jordan Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+962",
        "hours": "14:00"
    },
    {
        "Name": "Kazakhstan",
        "Code": "KZ",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+7",
        "hours": "10:00"
    },
    {
        "Name": "Kenya",
        "Code": "KE",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+254",
        "hours": "13:00"
    },
    {
        "Name": "Kiribati",
        "Code": "KI",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+686",
        "hours": "4:00"
    },
    {
        "Name": "Korea",
        "Code": "KR",
        "Timezone": "Korea Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+82",
        "hours": "7:00"
    },
    {
        "Name": "Kosovo",
        "Code": "XK",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+",
        "hours": "15:00"
    },
    {
        "Name": "Kuwait",
        "Code": "KW",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+965",
        "hours": "13:00"
    },
    {
        "Name": "Kyrgyzstan",
        "Code": "KG",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+996",
        "hours": "10:00"
    },
    {
        "Name": "Laos",
        "Code": "LA",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+856",
        "hours": "9:00"
    },
    {
        "Name": "Latvia",
        "Code": "LV",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+371",
        "hours": "14:00"
    },
    {
        "Name": "Lebanon",
        "Code": "LB",
        "Timezone": "Middle East Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+961",
        "hours": "14:00"
    },
    {
        "Name": "Lesotho",
        "Code": "LS",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+266",
        "hours": "14:00"
    },
    {
        "Name": "Liberia",
        "Code": "LR",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+231",
        "hours": "22:00"
    },
    {
        "Name": "Libya",
        "Code": "LY",
        "Timezone": "E. Europe Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+218",
        "hours": "14:00"
    },
    {
        "Name": "Liechtenstein",
        "Code": "LI",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+423",
        "hours": "15:00"
    },
    {
        "Name": "Lithuania",
        "Code": "LT",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+370",
        "hours": "14:00"
    },
    {
        "Name": "Luxembourg",
        "Code": "LU",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+352",
        "hours": "15:00"
    },
    {
        "Name": "Macao SAR",
        "Code": "MO",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+853",
        "hours": "8:00"
    },
    {
        "Name": "Macedonia, Former Yugoslav Republic of",
        "Code": "MK",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+389",
        "hours": "15:00"
    },
    {
        "Name": "Madagascar",
        "Code": "MG",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+261",
        "hours": "13:00"
    },
    {
        "Name": "Malawi",
        "Code": "MW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+265",
        "hours": "14:00"
    },
    {
        "Name": "Malaysia",
        "Code": "MY",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+60",
        "hours": "8:00"
    },
    {
        "Name": "Maldives",
        "Code": "MV",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+960",
        "hours": "11:00"
    },
    {
        "Name": "Mali",
        "Code": "ML",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+223",
        "hours": "22:00"
    },
    {
        "Name": "Malta",
        "Code": "MT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+356",
        "hours": "15:00"
    },
    {
        "Name": "Man, Isle of",
        "Code": "IM",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1624",
        "hours": "22:00"
    },
    {
        "Name": "Marshall Islands",
        "Code": "MH",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+692",
        "hours": "4:00"
    },
    {
        "Name": "Martinique",
        "Code": "MQ",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+596",
        "hours": "14:00"
    },
    {
        "Name": "Mauritania",
        "Code": "MR",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+222",
        "hours": "22:00"
    },
    {
        "Name": "Mauritius",
        "Code": "MU",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+230",
        "hours": "12:00"
    },
    {
        "Name": "Mayotte",
        "Code": "YT",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+262",
        "hours": "13:00"
    },
    {
        "Name": "Mexico",
        "Code": "MX",
        "Timezone": "Central Standard Time (Mexico)",
        "UTC": "UTC-06:00",
        "MobileCode": "+52",
        "hours": "16:00"
    },
    {
        "Name": "Micronesia",
        "Code": "FM",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+691",
        "hours": "6:00"
    },
    {
        "Name": "Moldova",
        "Code": "MD",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+373",
        "hours": "14:00"
    },
    {
        "Name": "Monaco",
        "Code": "MC",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+377",
        "hours": "15:00"
    },
    {
        "Name": "Mongolia",
        "Code": "MN",
        "Timezone": "Ulaanbaatar Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+976",
        "hours": "8:00"
    },
    {
        "Name": "Montenegro",
        "Code": "ME",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+382",
        "hours": "15:00"
    },
    {
        "Name": "Montserrat",
        "Code": "MS",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-664",
        "hours": "14:00"
    },
    {
        "Name": "Morocco",
        "Code": "MA",
        "Timezone": "Morocco Standard Time",
        "UTC": "UTC",
        "MobileCode": "+212",
        "hours": "22:00"
    },
    {
        "Name": "Mozambique",
        "Code": "MZ",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+258",
        "hours": "14:00"
    },
    {
        "Name": "Myanmar",
        "Code": "MM",
        "Timezone": "Myanmar Standard Time",
        "UTC": "UTC+06:30",
        "MobileCode": "+95",
        "hours": "10:00"
    },
    {
        "Name": "Namibia",
        "Code": "NA",
        "Timezone": "Namibia Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+264",
        "hours": "15:00"
    },
    {
        "Name": "Nauru",
        "Code": "NR",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+674",
        "hours": "4:00"
    },
    {
        "Name": "Nepal",
        "Code": "NP",
        "Timezone": "Nepal Standard Time",
        "UTC": "UTC+05:45",
        "MobileCode": "+977",
        "hours": "11:00"
    },
    {
        "Name": "Netherlands",
        "Code": "NL",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+31",
        "hours": "15:00"
    },
    {
        "Name": "New Caledonia",
        "Code": "NC",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+687",
        "hours": "5:00"
    },
    {
        "Name": "New Zealand",
        "Code": "NZ",
        "Timezone": "New Zealand Standard Time",
        "UTC": "UTC+12:00",
        "MobileCode": "+64",
        "hours": "4:00"
    },
    {
        "Name": "Nicaragua",
        "Code": "NI",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+505",
        "hours": "16:00"
    },
    {
        "Name": "Niger",
        "Code": "NE",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+227",
        "hours": "15:00"
    },
    {
        "Name": "Nigeria",
        "Code": "NG",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+234",
        "hours": "15:00"
    },
    {
        "Name": "Niue",
        "Code": "NU",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+683",
        "hours": "21:00"
    },
    {
        "Name": "Norfolk Island",
        "Code": "NF",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+672",
        "hours": "5:00"
    },
    {
        "Name": "North Korea",
        "Code": "KP",
        "Timezone": "Korea Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+850",
        "hours": "7:00"
    },
    {
        "Name": "Northern Mariana Islands",
        "Code": "MP",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+1-670",
        "hours": "6:00"
    },
    {
        "Name": "Norway",
        "Code": "NO",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    {
        "Name": "Oman",
        "Code": "OM",
        "Timezone": "Arabian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+968",
        "hours": "12:00"
    },
    {
        "Name": "Pakistan",
        "Code": "PK",
        "Timezone": "Pakistan Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+92",
        "hours": "11:00"
    },
    {
        "Name": "Palau",
        "Code": "PW",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+680",
        "hours": "7:00"
    },
    {
        "Name": "Palestinian Authority",
        "Code": "PS",
        "Timezone": "Egypt Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+970",
        "hours": "14:00"
    },
    {
        "Name": "Panama",
        "Code": "PA",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+507",
        "hours": "15:00"
    },
    {
        "Name": "Papua New Guinea",
        "Code": "PG",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+675",
        "hours": "6:00"
    },
    {
        "Name": "Paraguay",
        "Code": "PY",
        "Timezone": "Paraguay Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+595",
        "hours": "14:00"
    },
    {
        "Name": "Peru",
        "Code": "PE",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+51",
        "hours": "15:00"
    },
    {
        "Name": "Philippines",
        "Code": "PH",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+63",
        "hours": "8:00"
    },
    {
        "Name": "Pitcairn Islands",
        "Code": "PN",
        "Timezone": "Pacific Standard Time",
        "UTC": "UTC-08:00",
        "MobileCode": "+870",
        "hours": "18:00"
    },
    {
        "Name": "Poland",
        "Code": "PL",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+48",
        "hours": "15:00"
    },
    {
        "Name": "Portugal",
        "Code": "PT",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+351",
        "hours": "22:00"
    },
    {
        "Name": "Puerto Rico",
        "Code": "PR",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-787 and 1-939",
        "hours": "14:00"
    },
    {
        "Name": "Qatar",
        "Code": "QA",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+974",
        "hours": "13:00"
    },
    {
        "Name": "Reunion",
        "Code": "RE",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+262",
        "hours": "12:00"
    },
    {
        "Name": "Romania",
        "Code": "RO",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+40",
        "hours": "14:00"
    },
    {
        "Name": "Russia",
        "Code": "RU",
        "Timezone": "Russian Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+7",
        "hours": "13:00"
    },
    {
        "Name": "Rwanda",
        "Code": "RW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+250",
        "hours": "14:00"
    },
    {
        "Name": "Saint Barthélemy",
        "Code": "BL",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    {
        "Name": "Saint Helena, Ascension and Tristan da Cunha",
        "Code": "SH",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+290",
        "hours": "22:00"
    },
    {
        "Name": "Saint Kitts and Nevis",
        "Code": "KN",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-869",
        "hours": "14:00"
    },
    {
        "Name": "Saint Lucia",
        "Code": "LC",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-758",
        "hours": "14:00"
    },
    {
        "Name": "Saint Martin (French part)",
        "Code": "MF",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    {
        "Name": "Saint Pierre and Miquelon",
        "Code": "PM",
        "Timezone": "Greenland Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+508",
        "hours": "13:00"
    },
    {
        "Name": "Saint Vincent and the Grenadines",
        "Code": "VC",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-784",
        "hours": "14:00"
    },
    {
        "Name": "Samoa",
        "Code": "WS",
        "Timezone": "Samoa Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+685",
        "hours": "3:00"
    },
    {
        "Name": "San Marino",
        "Code": "SM",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+378",
        "hours": "15:00"
    },
    {
        "Name": "São Tomé and Príncipe",
        "Code": "ST",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+239",
        "hours": "22:00"
    },
    {
        "Name": "Saudi Arabia",
        "Code": "SA",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+966",
        "hours": "13:00"
    },
    {
        "Name": "Senegal",
        "Code": "SN",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+221",
        "hours": "22:00"
    },
    {
        "Name": "Serbia",
        "Code": "RS",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+381",
        "hours": "15:00"
    },
    {
        "Name": "Seychelles",
        "Code": "SC",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+248",
        "hours": "12:00"
    },
    {
        "Name": "Sierra Leone",
        "Code": "SL",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+232",
        "hours": "22:00"
    },
    {
        "Name": "Singapore",
        "Code": "SG",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+65",
        "hours": "8:00"
    },
    {
        "Name": "Sint Maarten (Dutch part)",
        "Code": "SX",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    {
        "Name": "Slovakia",
        "Code": "SK",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+421",
        "hours": "15:00"
    },
    {
        "Name": "Slovenia",
        "Code": "SI",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+386",
        "hours": "15:00"
    },
    {
        "Name": "Solomon Islands",
        "Code": "SB",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+677",
        "hours": "5:00"
    },
    {
        "Name": "Somalia",
        "Code": "SO",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+252",
        "hours": "13:00"
    },
    {
        "Name": "South Africa",
        "Code": "ZA",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+27",
        "hours": "14:00"
    },
    {
        "Name": "South Georgia and the South Sandwich Islands",
        "Code": "GS",
        "Timezone": "UTC-02",
        "UTC": "UTC-02:00",
        "MobileCode": "+",
        "hours": "12:00"
    },
    {
        "Name": "South Sudan",
        "Code": "SS",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+211",
        "hours": "13:00"
    },
    {
        "Name": "Spain",
        "Code": "ES",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+34",
        "hours": "15:00"
    },
    {
        "Name": "Sri Lanka",
        "Code": "LK",
        "Timezone": "Sri Lanka Standard Time",
        "UTC": "UTC+05:30",
        "MobileCode": "+94",
        "hours": "11:00"
    },
    {
        "Name": "Sudan",
        "Code": "SD",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+249",
        "hours": "13:00"
    },
    {
        "Name": "Suriname",
        "Code": "SR",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+597",
        "hours": "13:00"
    },
    {
        "Name": "Svalbard",
        "Code": "SJ",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    {
        "Name": "Swaziland",
        "Code": "SZ",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+268",
        "hours": "14:00"
    },
    {
        "Name": "Sweden",
        "Code": "SE",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+46",
        "hours": "15:00"
    },
    {
        "Name": "Switzerland",
        "Code": "CH",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+41",
        "hours": "15:00"
    },
    {
        "Name": "Syria",
        "Code": "SY",
        "Timezone": "Syria Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+963",
        "hours": "14:00"
    },
    {
        "Name": "Taiwan",
        "Code": "TW",
        "Timezone": "Taipei Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+886",
        "hours": "8:00"
    },
    {
        "Name": "Tajikistan",
        "Code": "TJ",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+992",
        "hours": "11:00"
    },
    {
        "Name": "Tanzania",
        "Code": "TZ",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+255",
        "hours": "13:00"
    },
    {
        "Name": "Thailand",
        "Code": "TH",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+66",
        "hours": "9:00"
    },
    {
        "Name": "Togo",
        "Code": "TG",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+228",
        "hours": "22:00"
    },
    {
        "Name": "Tokelau",
        "Code": "TK",
        "Timezone": "Tonga Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+690",
        "hours": "3:00"
    },
    {
        "Name": "Tonga",
        "Code": "TO",
        "Timezone": "Tonga Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+676",
        "hours": "3:00"
    },
    {
        "Name": "Trinidad and Tobago",
        "Code": "TT",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-868",
        "hours": "14:00"
    },
    {
        "Name": "Tunisia",
        "Code": "TN",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+216",
        "hours": "15:00"
    },
    {
        "Name": "Turkey",
        "Code": "TR",
        "Timezone": "Turkey Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+90",
        "hours": "14:00"
    },
    {
        "Name": "Turkmenistan",
        "Code": "TM",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+993",
        "hours": "11:00"
    },
    {
        "Name": "Turks and Caicos Islands",
        "Code": "TC",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-649",
        "hours": "15:00"
    },
    {
        "Name": "Tuvalu",
        "Code": "TV",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+688",
        "hours": "4:00"
    },
    {
        "Name": "U.S. Minor Outlying Islands",
        "Code": "UM",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+1",
        "hours": "21:00"
    },
    {
        "Name": "Uganda",
        "Code": "UG",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+256",
        "hours": "13:00"
    },
    {
        "Name": "Ukraine",
        "Code": "UA",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+380",
        "hours": "14:00"
    },
    {
        "Name": "United Arab Emirates",
        "Code": "AE",
        "Timezone": "Arabian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+971",
        "hours": "12:00"
    },
    {
        "Name": "United Kingdom",
        "Code": "GB",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44",
        "hours": "22:00"
    },
    {
        "Name": "United States",
        "Code": "US",
        "Timezone": "Pacific Standard Time",
        "UTC": "UTC-08:00",
        "MobileCode": "+1",
        "hours": "18:00"
    },
    {
        "Name": "Uruguay",
        "Code": "UY",
        "Timezone": "Montevideo Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+598",
        "hours": "13:00"
    },
    {
        "Name": "Uzbekistan",
        "Code": "UZ",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+998",
        "hours": "11:00"
    },
    {
        "Name": "Vanuatu",
        "Code": "VU",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+678",
        "hours": "5:00"
    },
    {
        "Name": "Vatican City",
        "Code": "VA",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+379",
        "hours": "15:00"
    },
    {
        "Name": "Vietnam",
        "Code": "VN",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+84",
        "hours": "9:00"
    },
    {
        "Name": "Virgin Islands, U.S.",
        "Code": "VI",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-340",
        "hours": "14:00"
    },
    {
        "Name": "Virgin Islands, British",
        "Code": "VG",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-284",
        "hours": "14:00"
    },
    {
        "Name": "Wallis and Futuna",
        "Code": "WF",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+681",
        "hours": "4:00"
    },
    {
        "Name": "Yemen",
        "Code": "YE",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+967",
        "hours": "13:00"
    },
    {
        "Name": "Zambia",
        "Code": "ZM",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+260",
        "hours": "14:00"
    },
    {
        "Name": "Zimbabwe",
        "Code": "ZW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+263",
        "hours": "14:00"
    }
]


exports.STATUS = { ACTIVE: "ACTIVE", BLOCK: "BLOCK", DELETE: "DELETE" }
exports.NOTIFICATION_TEMPLATES_TYPES = { EMAIL: "EMAIL", SMS: "SMS" }

exports.RESPONSE_STATUS = {
    GONE: 410,
    CREATED: 201,
    SUCCESS: 200,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    BAD_GATEWAY:502,
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
        USERNAME_REGISTERED: "This username is already registered",
        PAN_ALREADY_REGISTERED: "This PAN Number is already registered",
        EMAIL_ALREADY_REGISTERED: "Email Already Registered",
        EMAIL_NOT_REGISTERED: "Email/Username Not Registered",
        EMAIL_SENT: "check updated email",
        BLOCKED_USER: "This user is inactive, Please contact to admin"

    };

exports.EMAIL_STATUSES = {
    SENT: "SENT",
    INVALID: "INVALID",
    LINK_EXPIRED: "LINK EXPIRED",
    VERIFIED: "VERIFIED",
    NOT_VERIFIED: "NOT VERIFIED",

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



exports.COUNTRY_ARRAY = {
    "afghanistan": {
        "Name": "Afghanistan",
        "Code": "AF",
        "Timezone": "Afghanistan Standard Time",
        "UTC": "UTC+04:30",
        "MobileCode": "+93",
        "hours": "12:00"
    },
    "åland islands": {
        "Name": "Åland Islands",
        "Code": "AX",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+358-18",
        "hours": "14:00"
    },
    "albania": {
        "Name": "Albania",
        "Code": "AL",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+355",
        "hours": "15:00"
    },
    "algeria": {
        "Name": "Algeria",
        "Code": "DZ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+213",
        "hours": "15:00"
    },
    "american samoa": {
        "Name": "American Samoa",
        "Code": "AS",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+1-684",
        "hours": "21:00"
    },
    "andorra": {
        "Name": "Andorra",
        "Code": "AD",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+376",
        "hours": "15:00"
    },
    "angola": {
        "Name": "Angola",
        "Code": "AO",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+244",
        "hours": "15:00"
    },
    "anguilla": {
        "Name": "Anguilla",
        "Code": "AI",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-264",
        "hours": "14:00"
    },
    "antarctica": {
        "Name": "Antarctica",
        "Code": "AQ",
        "Timezone": "Pacific SA Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+",
        "hours": "13:00"
    },
    "antigua and barbuda": {
        "Name": "Antigua and Barbuda",
        "Code": "AG",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-268",
        "hours": "14:00"
    },
    "argentina": {
        "Name": "Argentina",
        "Code": "AR",
        "Timezone": "Argentina Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+54",
        "hours": "13:00"
    },
    "armenia": {
        "Name": "Armenia",
        "Code": "AM",
        "Timezone": "Caucasus Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+374",
        "hours": "12:00"
    },
    "aruba": {
        "Name": "Aruba",
        "Code": "AW",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+297",
        "hours": "14:00"
    },
    "australia": {
        "Name": "Australia",
        "Code": "AU",
        "Timezone": "AUS Eastern Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+61",
        "hours": "6:00"
    },
    "austria": {
        "Name": "Austria",
        "Code": "AT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+43",
        "hours": "15:00"
    },
    "azerbaijan": {
        "Name": "Azerbaijan",
        "Code": "AZ",
        "Timezone": "Azerbaijan Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+994",
        "hours": "12:00"
    },
    "bahamas, the": {
        "Name": "Bahamas, The",
        "Code": "BS",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-242",
        "hours": "15:00"
    },
    "bahrain": {
        "Name": "Bahrain",
        "Code": "BH",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+973",
        "hours": "13:00"
    },
    "bangladesh": {
        "Name": "Bangladesh",
        "Code": "BD",
        "Timezone": "Bangladesh Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+880",
        "hours": "10:00"
    },
    "barbados": {
        "Name": "Barbados",
        "Code": "BB",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-246",
        "hours": "14:00"
    },
    "belarus": {
        "Name": "Belarus",
        "Code": "BY",
        "Timezone": "Belarus Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+375",
        "hours": "13:00"
    },
    "belgium": {
        "Name": "Belgium",
        "Code": "BE",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+32",
        "hours": "15:00"
    },
    "belize": {
        "Name": "Belize",
        "Code": "BZ",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+501",
        "hours": "16:00"
    },
    "benin": {
        "Name": "Benin",
        "Code": "BJ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+229",
        "hours": "15:00"
    },
    "bermuda": {
        "Name": "Bermuda",
        "Code": "BM",
        "Timezone": "Atlantic Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-441",
        "hours": "14:00"
    },
    "bhutan": {
        "Name": "Bhutan",
        "Code": "BT",
        "Timezone": "Bangladesh Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+975",
        "hours": "10:00"
    },
    "bolivarian republic of venezuela": {
        "Name": "Bolivarian Republic of Venezuela",
        "Code": "VE",
        "Timezone": "Venezuela Standard Time",
        "UTC": "UTC-04:30",
        "MobileCode": "+58",
        "hours": "14:00"
    },
    "bolivia": {
        "Name": "Bolivia",
        "Code": "BO",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+591",
        "hours": "14:00"
    },
    "bonaire, sint eustatius and saba": {
        "Name": "Bonaire, Sint Eustatius and Saba",
        "Code": "BQ",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    "bosnia and herzegovina": {
        "Name": "Bosnia and Herzegovina",
        "Code": "BA",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+387",
        "hours": "15:00"
    },
    "botswana": {
        "Name": "Botswana",
        "Code": "BW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+267",
        "hours": "14:00"
    },
    "bouvet island": {
        "Name": "Bouvet Island",
        "Code": "BV",
        "Timezone": "UTC",
        "UTC": "UTC",
        "MobileCode": "+",
        "hours": "22:00"
    },
    "brazil": {
        "Name": "Brazil",
        "Code": "BR",
        "Timezone": "E. South America Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+55",
        "hours": "13:00"
    },
    "british indian ocean territory": {
        "Name": "British Indian Ocean Territory",
        "Code": "IO",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+246",
        "hours": "10:00"
    },
    "brunei": {
        "Name": "Brunei",
        "Code": "BN",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+673",
        "hours": "8:00"
    },
    "bulgaria": {
        "Name": "Bulgaria",
        "Code": "BG",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+359",
        "hours": "14:00"
    },
    "burkina faso": {
        "Name": "Burkina Faso",
        "Code": "BF",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+226",
        "hours": "22:00"
    },
    "burundi": {
        "Name": "Burundi",
        "Code": "BI",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+257",
        "hours": "14:00"
    },
    "cabo verde": {
        "Name": "Cabo Verde",
        "Code": "CV",
        "Timezone": "Cape Verde Standard Time",
        "UTC": "UTC-01:00",
        "MobileCode": "+238",
        "hours": "11:00"
    },
    "cambodia": {
        "Name": "Cambodia",
        "Code": "KH",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+855",
        "hours": "9:00"
    },
    "cameroon": {
        "Name": "Cameroon",
        "Code": "CM",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+237",
        "hours": "15:00"
    },
    "canada": {
        "Name": "Canada",
        "Code": "CA",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1",
        "hours": "15:00"
    },
    "cayman islands": {
        "Name": "Cayman Islands",
        "Code": "KY",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-345",
        "hours": "15:00"
    },
    "central african republic": {
        "Name": "Central African Republic",
        "Code": "CF",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+236",
        "hours": "15:00"
    },
    "chad": {
        "Name": "Chad",
        "Code": "TD",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+235",
        "hours": "15:00"
    },
    "chile": {
        "Name": "Chile",
        "Code": "CL",
        "Timezone": "Pacific SA Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+56",
        "hours": "13:00"
    },
    "china": {
        "Name": "China",
        "Code": "CN",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+86",
        "hours": "8:00"
    },
    "christmas island": {
        "Name": "Christmas Island",
        "Code": "CX",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+61",
        "hours": "9:00"
    },
    "cocos (keeling) islands": {
        "Name": "Cocos (Keeling) Islands",
        "Code": "CC",
        "Timezone": "Myanmar Standard Time",
        "UTC": "UTC+06:30",
        "MobileCode": "+61",
        "hours": "10:00"
    },
    "colombia": {
        "Name": "Colombia",
        "Code": "CO",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+57",
        "hours": "15:00"
    },
    "comoros": {
        "Name": "Comoros",
        "Code": "KM",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+269",
        "hours": "13:00"
    },
    "congo": {
        "Name": "Congo",
        "Code": "CG",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+242",
        "hours": "15:00"
    },
    "congo (drc)": {
        "Name": "Congo (DRC)",
        "Code": "CD",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+243",
        "hours": "15:00"
    },
    "cook islands": {
        "Name": "Cook Islands",
        "Code": "CK",
        "Timezone": "Hawaiian Standard Time",
        "UTC": "UTC-10:00",
        "MobileCode": "+682",
        "hours": "20:00"
    },
    "costa rica": {
        "Name": "Costa Rica",
        "Code": "CR",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+506",
        "hours": "16:00"
    },
    "côte d'ivoire": {
        "Name": "Côte d'Ivoire",
        "Code": "CI",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+225",
        "hours": "22:00"
    },
    "croatia": {
        "Name": "Croatia",
        "Code": "HR",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+385",
        "hours": "15:00"
    },
    "cuba": {
        "Name": "Cuba",
        "Code": "CU",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+53",
        "hours": "15:00"
    },
    "curaçao": {
        "Name": "Curaçao",
        "Code": "CW",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    "cyprus": {
        "Name": "Cyprus",
        "Code": "CY",
        "Timezone": "E. Europe Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+357",
        "hours": "14:00"
    },
    "czech republic": {
        "Name": "Czech Republic",
        "Code": "CZ",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+420",
        "hours": "15:00"
    },
    "democratic republic of timor-leste": {
        "Name": "Democratic Republic of Timor-Leste",
        "Code": "TL",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+670",
        "hours": "7:00"
    },
    "denmark": {
        "Name": "Denmark",
        "Code": "DK",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+45",
        "hours": "15:00"
    },
    "djibouti": {
        "Name": "Djibouti",
        "Code": "DJ",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+253",
        "hours": "13:00"
    },
    "dominica": {
        "Name": "Dominica",
        "Code": "DM",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-767",
        "hours": "14:00"
    },
    "dominican republic": {
        "Name": "Dominican Republic",
        "Code": "DO",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-809 and 1-829",
        "hours": "14:00"
    },
    "ecuador": {
        "Name": "Ecuador",
        "Code": "EC",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+593",
        "hours": "15:00"
    },
    "egypt": {
        "Name": "Egypt",
        "Code": "EG",
        "Timezone": "Egypt Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+20",
        "hours": "14:00"
    },
    "el salvador": {
        "Name": "El Salvador",
        "Code": "SV",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+503",
        "hours": "16:00"
    },
    "equatorial guinea": {
        "Name": "Equatorial Guinea",
        "Code": "GQ",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+240",
        "hours": "15:00"
    },
    "eritrea": {
        "Name": "Eritrea",
        "Code": "ER",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+291",
        "hours": "13:00"
    },
    "estonia": {
        "Name": "Estonia",
        "Code": "EE",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+372",
        "hours": "14:00"
    },
    "ethiopia": {
        "Name": "Ethiopia",
        "Code": "ET",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+251",
        "hours": "13:00"
    },
    "falkland islands (islas malvinas)": {
        "Name": "Falkland Islands (Islas Malvinas)",
        "Code": "FK",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+500",
        "hours": "13:00"
    },
    "faroe islands": {
        "Name": "Faroe Islands",
        "Code": "FO",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+298",
        "hours": "22:00"
    },
    "fiji islands": {
        "Name": "Fiji Islands",
        "Code": "FJ",
        "Timezone": "Fiji Standard Time",
        "UTC": "UTC+12:00",
        "MobileCode": "+679",
        "hours": "4:00"
    },
    "finland": {
        "Name": "Finland",
        "Code": "FI",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+358",
        "hours": "14:00"
    },
    "france": {
        "Name": "France",
        "Code": "FR",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+33",
        "hours": "15:00"
    },
    "french guiana": {
        "Name": "French Guiana",
        "Code": "GF",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+594",
        "hours": "13:00"
    },
    "french polynesia": {
        "Name": "French Polynesia",
        "Code": "PF",
        "Timezone": "Hawaiian Standard Time",
        "UTC": "UTC-10:00",
        "MobileCode": "+689",
        "hours": "20:00"
    },
    "french southern and antarctic lands": {
        "Name": "French Southern and Antarctic Lands",
        "Code": "TF",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+",
        "hours": "11:00"
    },
    "gabon": {
        "Name": "Gabon",
        "Code": "GA",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+241",
        "hours": "15:00"
    },
    "gambia, the": {
        "Name": "Gambia, The",
        "Code": "GM",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+220",
        "hours": "22:00"
    },
    "georgia": {
        "Name": "Georgia",
        "Code": "GE",
        "Timezone": "Georgian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+995",
        "hours": "12:00"
    },
    "germany": {
        "Name": "Germany",
        "Code": "DE",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+49",
        "hours": "15:00"
    },
    "ghana": {
        "Name": "Ghana",
        "Code": "GH",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+233",
        "hours": "22:00"
    },
    "gibraltar": {
        "Name": "Gibraltar",
        "Code": "GI",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+350",
        "hours": "15:00"
    },
    "greece": {
        "Name": "Greece",
        "Code": "GR",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+30",
        "hours": "14:00"
    },
    "greenland": {
        "Name": "Greenland",
        "Code": "GL",
        "Timezone": "Greenland Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+299",
        "hours": "13:00"
    },
    "grenada": {
        "Name": "Grenada",
        "Code": "GD",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-473",
        "hours": "14:00"
    },
    "guadeloupe": {
        "Name": "Guadeloupe",
        "Code": "GP",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    "guam": {
        "Name": "Guam",
        "Code": "GU",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+1-671",
        "hours": "6:00"
    },
    "guatemala": {
        "Name": "Guatemala",
        "Code": "GT",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+502",
        "hours": "16:00"
    },
    "guernsey": {
        "Name": "Guernsey",
        "Code": "GG",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1481",
        "hours": "22:00"
    },
    "guinea": {
        "Name": "Guinea",
        "Code": "GN",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+224",
        "hours": "22:00"
    },
    "guinea-bissau": {
        "Name": "Guinea-Bissau",
        "Code": "GW",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+245",
        "hours": "22:00"
    },
    "guyana": {
        "Name": "Guyana",
        "Code": "GY",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+592",
        "hours": "14:00"
    },
    "haiti": {
        "Name": "Haiti",
        "Code": "HT",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+509",
        "hours": "15:00"
    },
    "heard island and mcdonald islands": {
        "Name": "Heard Island and McDonald Islands",
        "Code": "HM",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+ ",
        "hours": "12:00"
    },
    "honduras": {
        "Name": "Honduras",
        "Code": "HN",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+504",
        "hours": "16:00"
    },
    "hong kong sar": {
        "Name": "Hong Kong SAR",
        "Code": "HK",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+852",
        "hours": "8:00"
    },
    "hungary": {
        "Name": "Hungary",
        "Code": "HU",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+36",
        "hours": "15:00"
    },
    "iceland": {
        "Name": "Iceland",
        "Code": "IS",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+354",
        "hours": "22:00"
    },
    "india": {
        "Name": "India",
        "Code": "IN",
        "Timezone": "India Standard Time",
        "UTC": "UTC+05:30",
        "MobileCode": "+91",
        "hours": "11:00"
    },
    "no specific country": {
        "Name": "no specific country",
        "Code": "IN",
        "Timezone": "India Standard Time",
        "UTC": "UTC+05:30",
        "MobileCode": "+91",
        "hours": "11:00"
    },
    "indonesia": {
        "Name": "Indonesia",
        "Code": "ID",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+62",
        "hours": "9:00"
    },
    "iran": {
        "Name": "Iran",
        "Code": "IR",
        "Timezone": "Iran Standard Time",
        "UTC": "UTC+03:30",
        "MobileCode": "+98",
        "hours": "13:00"
    },
    "iraq": {
        "Name": "Iraq",
        "Code": "IQ",
        "Timezone": "Arabic Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+964",
        "hours": "13:00"
    },
    "ireland": {
        "Name": "Ireland",
        "Code": "IE",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+353",
        "hours": "22:00"
    },
    "israel": {
        "Name": "Israel",
        "Code": "IL",
        "Timezone": "Israel Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+972",
        "hours": "14:00"
    },
    "italy": {
        "Name": "Italy",
        "Code": "IT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+39",
        "hours": "15:00"
    },
    "jamaica": {
        "Name": "Jamaica",
        "Code": "JM",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-876",
        "hours": "15:00"
    },
    "jan mayen": {
        "Name": "Jan Mayen",
        "Code": "SJ",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    "japan": {
        "Name": "Japan",
        "Code": "JP",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+81",
        "hours": "7:00"
    },
    "jersey": {
        "Name": "Jersey",
        "Code": "JE",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1534",
        "hours": "22:00"
    },
    "jordan": {
        "Name": "Jordan",
        "Code": "JO",
        "Timezone": "Jordan Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+962",
        "hours": "14:00"
    },
    "kazakhstan": {
        "Name": "Kazakhstan",
        "Code": "KZ",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+7",
        "hours": "10:00"
    },
    "kenya": {
        "Name": "Kenya",
        "Code": "KE",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+254",
        "hours": "13:00"
    },
    "kiribati": {
        "Name": "Kiribati",
        "Code": "KI",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+686",
        "hours": "4:00"
    },
    "korea": {
        "Name": "Korea",
        "Code": "KR",
        "Timezone": "Korea Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+82",
        "hours": "7:00"
    },
    "kosovo": {
        "Name": "Kosovo",
        "Code": "XK",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+",
        "hours": "15:00"
    },
    "kuwait": {
        "Name": "Kuwait",
        "Code": "KW",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+965",
        "hours": "13:00"
    },
    "kyrgyzstan": {
        "Name": "Kyrgyzstan",
        "Code": "KG",
        "Timezone": "Central Asia Standard Time",
        "UTC": "UTC+06:00",
        "MobileCode": "+996",
        "hours": "10:00"
    },
    "laos": {
        "Name": "Laos",
        "Code": "LA",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+856",
        "hours": "9:00"
    },
    "latvia": {
        "Name": "Latvia",
        "Code": "LV",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+371",
        "hours": "14:00"
    },
    "lebanon": {
        "Name": "Lebanon",
        "Code": "LB",
        "Timezone": "Middle East Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+961",
        "hours": "14:00"
    },
    "lesotho": {
        "Name": "Lesotho",
        "Code": "LS",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+266",
        "hours": "14:00"
    },
    "liberia": {
        "Name": "Liberia",
        "Code": "LR",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+231",
        "hours": "22:00"
    },
    "libya": {
        "Name": "Libya",
        "Code": "LY",
        "Timezone": "E. Europe Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+218",
        "hours": "14:00"
    },
    "liechtenstein": {
        "Name": "Liechtenstein",
        "Code": "LI",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+423",
        "hours": "15:00"
    },
    "lithuania": {
        "Name": "Lithuania",
        "Code": "LT",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+370",
        "hours": "14:00"
    },
    "luxembourg": {
        "Name": "Luxembourg",
        "Code": "LU",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+352",
        "hours": "15:00"
    },
    "macao sar": {
        "Name": "Macao SAR",
        "Code": "MO",
        "Timezone": "China Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+853",
        "hours": "8:00"
    },
    "macedonia, former yugoslav republic of": {
        "Name": "Macedonia, Former Yugoslav Republic of",
        "Code": "MK",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+389",
        "hours": "15:00"
    },
    "madagascar": {
        "Name": "Madagascar",
        "Code": "MG",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+261",
        "hours": "13:00"
    },
    "malawi": {
        "Name": "Malawi",
        "Code": "MW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+265",
        "hours": "14:00"
    },
    "malaysia": {
        "Name": "Malaysia",
        "Code": "MY",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+60",
        "hours": "8:00"
    },
    "maldives": {
        "Name": "Maldives",
        "Code": "MV",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+960",
        "hours": "11:00"
    },
    "mali": {
        "Name": "Mali",
        "Code": "ML",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+223",
        "hours": "22:00"
    },
    "malta": {
        "Name": "Malta",
        "Code": "MT",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+356",
        "hours": "15:00"
    },
    "man, isle of": {
        "Name": "Man, Isle of",
        "Code": "IM",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44-1624",
        "hours": "22:00"
    },
    "marshall islands": {
        "Name": "Marshall Islands",
        "Code": "MH",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+692",
        "hours": "4:00"
    },
    "martinique": {
        "Name": "Martinique",
        "Code": "MQ",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+596",
        "hours": "14:00"
    },
    "mauritania": {
        "Name": "Mauritania",
        "Code": "MR",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+222",
        "hours": "22:00"
    },
    "mauritius": {
        "Name": "Mauritius",
        "Code": "MU",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+230",
        "hours": "12:00"
    },
    "mayotte": {
        "Name": "Mayotte",
        "Code": "YT",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+262",
        "hours": "13:00"
    },
    "mexico": {
        "Name": "Mexico",
        "Code": "MX",
        "Timezone": "Central Standard Time (Mexico)",
        "UTC": "UTC-06:00",
        "MobileCode": "+52",
        "hours": "16:00"
    },
    "micronesia": {
        "Name": "Micronesia",
        "Code": "FM",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+691",
        "hours": "6:00"
    },
    "moldova": {
        "Name": "Moldova",
        "Code": "MD",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+373",
        "hours": "14:00"
    },
    "monaco": {
        "Name": "Monaco",
        "Code": "MC",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+377",
        "hours": "15:00"
    },
    "mongolia": {
        "Name": "Mongolia",
        "Code": "MN",
        "Timezone": "Ulaanbaatar Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+976",
        "hours": "8:00"
    },
    "montenegro": {
        "Name": "Montenegro",
        "Code": "ME",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+382",
        "hours": "15:00"
    },
    "montserrat": {
        "Name": "Montserrat",
        "Code": "MS",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-664",
        "hours": "14:00"
    },
    "morocco": {
        "Name": "Morocco",
        "Code": "MA",
        "Timezone": "Morocco Standard Time",
        "UTC": "UTC",
        "MobileCode": "+212",
        "hours": "22:00"
    },
    "mozambique": {
        "Name": "Mozambique",
        "Code": "MZ",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+258",
        "hours": "14:00"
    },
    "myanmar": {
        "Name": "Myanmar",
        "Code": "MM",
        "Timezone": "Myanmar Standard Time",
        "UTC": "UTC+06:30",
        "MobileCode": "+95",
        "hours": "10:00"
    },
    "namibia": {
        "Name": "Namibia",
        "Code": "NA",
        "Timezone": "Namibia Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+264",
        "hours": "15:00"
    },
    "nauru": {
        "Name": "Nauru",
        "Code": "NR",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+674",
        "hours": "4:00"
    },
    "nepal": {
        "Name": "Nepal",
        "Code": "NP",
        "Timezone": "Nepal Standard Time",
        "UTC": "UTC+05:45",
        "MobileCode": "+977",
        "hours": "11:00"
    },
    "netherlands": {
        "Name": "Netherlands",
        "Code": "NL",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+31",
        "hours": "15:00"
    },
    "new caledonia": {
        "Name": "New Caledonia",
        "Code": "NC",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+687",
        "hours": "5:00"
    },
    "new zealand": {
        "Name": "New Zealand",
        "Code": "NZ",
        "Timezone": "New Zealand Standard Time",
        "UTC": "UTC+12:00",
        "MobileCode": "+64",
        "hours": "4:00"
    },
    "nicaragua": {
        "Name": "Nicaragua",
        "Code": "NI",
        "Timezone": "Central America Standard Time",
        "UTC": "UTC-06:00",
        "MobileCode": "+505",
        "hours": "16:00"
    },
    "niger": {
        "Name": "Niger",
        "Code": "NE",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+227",
        "hours": "15:00"
    },
    "nigeria": {
        "Name": "Nigeria",
        "Code": "NG",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+234",
        "hours": "15:00"
    },
    "niue": {
        "Name": "Niue",
        "Code": "NU",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+683",
        "hours": "21:00"
    },
    "norfolk island": {
        "Name": "Norfolk Island",
        "Code": "NF",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+672",
        "hours": "5:00"
    },
    "north korea": {
        "Name": "North Korea",
        "Code": "KP",
        "Timezone": "Korea Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+850",
        "hours": "7:00"
    },
    "northern mariana islands": {
        "Name": "Northern Mariana Islands",
        "Code": "MP",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+1-670",
        "hours": "6:00"
    },
    "norway": {
        "Name": "Norway",
        "Code": "NO",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    "oman": {
        "Name": "Oman",
        "Code": "OM",
        "Timezone": "Arabian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+968",
        "hours": "12:00"
    },
    "pakistan": {
        "Name": "Pakistan",
        "Code": "PK",
        "Timezone": "Pakistan Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+92",
        "hours": "11:00"
    },
    "palau": {
        "Name": "Palau",
        "Code": "PW",
        "Timezone": "Tokyo Standard Time",
        "UTC": "UTC+09:00",
        "MobileCode": "+680",
        "hours": "7:00"
    },
    "palestinian authority": {
        "Name": "Palestinian Authority",
        "Code": "PS",
        "Timezone": "Egypt Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+970",
        "hours": "14:00"
    },
    "panama": {
        "Name": "Panama",
        "Code": "PA",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+507",
        "hours": "15:00"
    },
    "papua new guinea": {
        "Name": "Papua New Guinea",
        "Code": "PG",
        "Timezone": "West Pacific Standard Time",
        "UTC": "UTC+10:00",
        "MobileCode": "+675",
        "hours": "6:00"
    },
    "paraguay": {
        "Name": "Paraguay",
        "Code": "PY",
        "Timezone": "Paraguay Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+595",
        "hours": "14:00"
    },
    "peru": {
        "Name": "Peru",
        "Code": "PE",
        "Timezone": "SA Pacific Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+51",
        "hours": "15:00"
    },
    "philippines": {
        "Name": "Philippines",
        "Code": "PH",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+63",
        "hours": "8:00"
    },
    "pitcairn islands": {
        "Name": "Pitcairn Islands",
        "Code": "PN",
        "Timezone": "Pacific Standard Time",
        "UTC": "UTC-08:00",
        "MobileCode": "+870",
        "hours": "18:00"
    },
    "poland": {
        "Name": "Poland",
        "Code": "PL",
        "Timezone": "Central European Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+48",
        "hours": "15:00"
    },
    "portugal": {
        "Name": "Portugal",
        "Code": "PT",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+351",
        "hours": "22:00"
    },
    "puerto rico": {
        "Name": "Puerto Rico",
        "Code": "PR",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-787 and 1-939",
        "hours": "14:00"
    },
    "qatar": {
        "Name": "Qatar",
        "Code": "QA",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+974",
        "hours": "13:00"
    },
    "reunion": {
        "Name": "Reunion",
        "Code": "RE",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+262",
        "hours": "12:00"
    },
    "romania": {
        "Name": "Romania",
        "Code": "RO",
        "Timezone": "GTB Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+40",
        "hours": "14:00"
    },
    "russia": {
        "Name": "Russia",
        "Code": "RU",
        "Timezone": "Russian Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+7",
        "hours": "13:00"
    },
    "rwanda": {
        "Name": "Rwanda",
        "Code": "RW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+250",
        "hours": "14:00"
    },
    "saint barthélemy": {
        "Name": "Saint Barthélemy",
        "Code": "BL",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    "saint helena, ascension and tristan da cunha": {
        "Name": "Saint Helena, Ascension and Tristan da Cunha",
        "Code": "SH",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+290",
        "hours": "22:00"
    },
    "saint kitts and nevis": {
        "Name": "Saint Kitts and Nevis",
        "Code": "KN",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-869",
        "hours": "14:00"
    },
    "saint lucia": {
        "Name": "Saint Lucia",
        "Code": "LC",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-758",
        "hours": "14:00"
    },
    "saint martin (french part)": {
        "Name": "Saint Martin (French part)",
        "Code": "MF",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+590",
        "hours": "14:00"
    },
    "saint pierre and miquelon": {
        "Name": "Saint Pierre and Miquelon",
        "Code": "PM",
        "Timezone": "Greenland Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+508",
        "hours": "13:00"
    },
    "saint vincent and the grenadines": {
        "Name": "Saint Vincent and the Grenadines",
        "Code": "VC",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-784",
        "hours": "14:00"
    },
    "samoa": {
        "Name": "Samoa",
        "Code": "WS",
        "Timezone": "Samoa Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+685",
        "hours": "3:00"
    },
    "san marino": {
        "Name": "San Marino",
        "Code": "SM",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+378",
        "hours": "15:00"
    },
    "são tomé and príncipe": {
        "Name": "São Tomé and Príncipe",
        "Code": "ST",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+239",
        "hours": "22:00"
    },
    "saudi arabia": {
        "Name": "Saudi Arabia",
        "Code": "SA",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+966",
        "hours": "13:00"
    },
    "senegal": {
        "Name": "Senegal",
        "Code": "SN",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+221",
        "hours": "22:00"
    },
    "serbia": {
        "Name": "Serbia",
        "Code": "RS",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+381",
        "hours": "15:00"
    },
    "seychelles": {
        "Name": "Seychelles",
        "Code": "SC",
        "Timezone": "Mauritius Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+248",
        "hours": "12:00"
    },
    "sierra leone": {
        "Name": "Sierra Leone",
        "Code": "SL",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+232",
        "hours": "22:00"
    },
    "singapore": {
        "Name": "Singapore",
        "Code": "SG",
        "Timezone": "Singapore Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+65",
        "hours": "8:00"
    },
    "sint maarten (dutch part)": {
        "Name": "Sint Maarten (Dutch part)",
        "Code": "SX",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+599",
        "hours": "14:00"
    },
    "slovakia": {
        "Name": "Slovakia",
        "Code": "SK",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+421",
        "hours": "15:00"
    },
    "slovenia": {
        "Name": "Slovenia",
        "Code": "SI",
        "Timezone": "Central Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+386",
        "hours": "15:00"
    },
    "solomon islands": {
        "Name": "Solomon Islands",
        "Code": "SB",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+677",
        "hours": "5:00"
    },
    "somalia": {
        "Name": "Somalia",
        "Code": "SO",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+252",
        "hours": "13:00"
    },
    "south africa": {
        "Name": "South Africa",
        "Code": "ZA",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+27",
        "hours": "14:00"
    },
    "south georgia and the south sandwich islands": {
        "Name": "South Georgia and the South Sandwich Islands",
        "Code": "GS",
        "Timezone": "UTC-02",
        "UTC": "UTC-02:00",
        "MobileCode": "+",
        "hours": "12:00"
    },
    "south sudan": {
        "Name": "South Sudan",
        "Code": "SS",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+211",
        "hours": "13:00"
    },
    "spain": {
        "Name": "Spain",
        "Code": "ES",
        "Timezone": "Romance Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+34",
        "hours": "15:00"
    },
    "sri lanka": {
        "Name": "Sri Lanka",
        "Code": "LK",
        "Timezone": "Sri Lanka Standard Time",
        "UTC": "UTC+05:30",
        "MobileCode": "+94",
        "hours": "11:00"
    },
    "sudan": {
        "Name": "Sudan",
        "Code": "SD",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+249",
        "hours": "13:00"
    },
    "suriname": {
        "Name": "Suriname",
        "Code": "SR",
        "Timezone": "SA Eastern Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+597",
        "hours": "13:00"
    },
    "svalbard": {
        "Name": "Svalbard",
        "Code": "SJ",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+47",
        "hours": "15:00"
    },
    "swaziland": {
        "Name": "Swaziland",
        "Code": "SZ",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+268",
        "hours": "14:00"
    },
    "sweden": {
        "Name": "Sweden",
        "Code": "SE",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+46",
        "hours": "15:00"
    },
    "switzerland": {
        "Name": "Switzerland",
        "Code": "CH",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+41",
        "hours": "15:00"
    },
    "syria": {
        "Name": "Syria",
        "Code": "SY",
        "Timezone": "Syria Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+963",
        "hours": "14:00"
    },
    "taiwan": {
        "Name": "Taiwan",
        "Code": "TW",
        "Timezone": "Taipei Standard Time",
        "UTC": "UTC+08:00",
        "MobileCode": "+886",
        "hours": "8:00"
    },
    "tajikistan": {
        "Name": "Tajikistan",
        "Code": "TJ",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+992",
        "hours": "11:00"
    },
    "tanzania": {
        "Name": "Tanzania",
        "Code": "TZ",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+255",
        "hours": "13:00"
    },
    "thailand": {
        "Name": "Thailand",
        "Code": "TH",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+66",
        "hours": "9:00"
    },
    "togo": {
        "Name": "Togo",
        "Code": "TG",
        "Timezone": "Greenwich Standard Time",
        "UTC": "UTC",
        "MobileCode": "+228",
        "hours": "22:00"
    },
    "tokelau": {
        "Name": "Tokelau",
        "Code": "TK",
        "Timezone": "Tonga Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+690",
        "hours": "3:00"
    },
    "tonga": {
        "Name": "Tonga",
        "Code": "TO",
        "Timezone": "Tonga Standard Time",
        "UTC": "UTC+13:00",
        "MobileCode": "+676",
        "hours": "3:00"
    },
    "trinidad and tobago": {
        "Name": "Trinidad and Tobago",
        "Code": "TT",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-868",
        "hours": "14:00"
    },
    "tunisia": {
        "Name": "Tunisia",
        "Code": "TN",
        "Timezone": "W. Central Africa Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+216",
        "hours": "15:00"
    },
    "turkey": {
        "Name": "Turkey",
        "Code": "TR",
        "Timezone": "Turkey Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+90",
        "hours": "14:00"
    },
    "turkmenistan": {
        "Name": "Turkmenistan",
        "Code": "TM",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+993",
        "hours": "11:00"
    },
    "turks and caicos islands": {
        "Name": "Turks and Caicos Islands",
        "Code": "TC",
        "Timezone": "Eastern Standard Time",
        "UTC": "UTC-05:00",
        "MobileCode": "+1-649",
        "hours": "15:00"
    },
    "tuvalu": {
        "Name": "Tuvalu",
        "Code": "TV",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+688",
        "hours": "4:00"
    },
    "u.s. minor outlying islands": {
        "Name": "U.S. Minor Outlying Islands",
        "Code": "UM",
        "Timezone": "UTC-11",
        "UTC": "UTC-11:00",
        "MobileCode": "+1",
        "hours": "21:00"
    },
    "uganda": {
        "Name": "Uganda",
        "Code": "UG",
        "Timezone": "E. Africa Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+256",
        "hours": "13:00"
    },
    "ukraine": {
        "Name": "Ukraine",
        "Code": "UA",
        "Timezone": "FLE Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+380",
        "hours": "14:00"
    },
    "united arab emirates": {
        "Name": "United Arab Emirates",
        "Code": "AE",
        "Timezone": "Arabian Standard Time",
        "UTC": "UTC+04:00",
        "MobileCode": "+971",
        "hours": "12:00"
    },
    "united kingdom": {
        "Name": "United Kingdom",
        "Code": "GB",
        "Timezone": "GMT Standard Time",
        "UTC": "UTC",
        "MobileCode": "+44",
        "hours": "22:00"
    },
    "united states": {
        "Name": "United States",
        "Code": "US",
        "Timezone": "Pacific Standard Time",
        "UTC": "UTC-08:00",
        "MobileCode": "+1",
        "hours": "18:00"
    },
    "uruguay": {
        "Name": "Uruguay",
        "Code": "UY",
        "Timezone": "Montevideo Standard Time",
        "UTC": "UTC-03:00",
        "MobileCode": "+598",
        "hours": "13:00"
    },
    "uzbekistan": {
        "Name": "Uzbekistan",
        "Code": "UZ",
        "Timezone": "West Asia Standard Time",
        "UTC": "UTC+05:00",
        "MobileCode": "+998",
        "hours": "11:00"
    },
    "vanuatu": {
        "Name": "Vanuatu",
        "Code": "VU",
        "Timezone": "Central Pacific Standard Time",
        "UTC": "UTC+11:00",
        "MobileCode": "+678",
        "hours": "5:00"
    },
    "vatican city": {
        "Name": "Vatican City",
        "Code": "VA",
        "Timezone": "W. Europe Standard Time",
        "UTC": "UTC+01:00",
        "MobileCode": "+379",
        "hours": "15:00"
    },
    "vietnam": {
        "Name": "Vietnam",
        "Code": "VN",
        "Timezone": "SE Asia Standard Time",
        "UTC": "UTC+07:00",
        "MobileCode": "+84",
        "hours": "9:00"
    },
    "virgin islands, u.s.": {
        "Name": "Virgin Islands, U.S.",
        "Code": "VI",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-340",
        "hours": "14:00"
    },
    "virgin islands, british": {
        "Name": "Virgin Islands, British",
        "Code": "VG",
        "Timezone": "SA Western Standard Time",
        "UTC": "UTC-04:00",
        "MobileCode": "+1-284",
        "hours": "14:00"
    },
    "wallis and futuna": {
        "Name": "Wallis and Futuna",
        "Code": "WF",
        "Timezone": "UTC+12",
        "UTC": "UTC+12:00",
        "MobileCode": "+681",
        "hours": "4:00"
    },
    "yemen": {
        "Name": "Yemen",
        "Code": "YE",
        "Timezone": "Arab Standard Time",
        "UTC": "UTC+03:00",
        "MobileCode": "+967",
        "hours": "13:00"
    },
    "zambia": {
        "Name": "Zambia",
        "Code": "ZM",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+260",
        "hours": "14:00"
    },
    "zimbabwe": {
        "Name": "Zimbabwe",
        "Code": "ZW",
        "Timezone": "South Africa Standard Time",
        "UTC": "UTC+02:00",
        "MobileCode": "+263",
        "hours": "14:00"
    }
}

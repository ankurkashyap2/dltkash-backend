const bcrypt = require('bcryptjs');
const request = require('request');
const CryptoJS = require('crypto-js');
const shortUrl = require("node-url-shortener");
const nodemailer = require('nodemailer')
const { nanoid } = require('nanoid')
const shortner = require('./models/newSHortner');
var validUrl = require('valid-url');
const encryptString = (str) => {
  return bcrypt.hashSync(str, 8);
}

const getOTP = () => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

const sendMail = (email, subject, content, callback, entity = true) => {
  const options = {
    url: 'https://api.us1-mta1.sendclean.net/v1.0/messages/sendMail',
    json: true,
    "headers": {

      "X-Unique-Id": "id21"
    },
    body: {
      "message": {
        "X-Unique-Id": "id21",
        "to": [{
          "email": email,
        },
        ],
        "html": content,
        "subject": subject,
        "from_email": entity ? "no-reply@nse.co.in" : "no-reply@dltkash.com",
        "from_name": "no-reply"
      },
      "owner_id": process.env.SENDCLEANOWNERID || '80940214',
      "token": process.env.SENDCLEANTOKEN || '2bZ1zHM3tNHK43DotA9DfAdF',
      "smtp_user_name": process.env.SENDCLEANSMTPUSERNAME || 'smtp78357587'
    }
  };
  console.log('MAIL TO:--> ', email)
  request.post(options, callback);
}


const createShortNer = (original) => {
  const nnID = nanoid(15);
  const uri = `${process.env.FEHOST}/api/mobile/${nnID}`;
  const shortNerObj = {
    original: original,
    created: nnID
  };
  shortner.create(shortNerObj).then(() => { });
  return uri;
}

const removeElement = (array, elem) => {
  let index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}



function totitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const encryptWithAES = (text) => {
  const passphrase = 'DLTkash@';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};


function encryptFormattedUser(User) {
  const encUser = {};
  for (const key in User) {
    encUser[key] = encryptWithAES(User[key])
  }
  return encUser;
}
//write function on suitable basis
const validateMobile = (mobilenumber) => {
  var regmm = '^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
  var regmob = new RegExp(regmm);
  if (regmob.test(mobilenumber)) {
    return true;
  } else {
    return false;
  }
}

const decryptWithAES = (ciphertext) => {
  const passphrase = 'DLTkash@';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const shortURL = (url, callback) => {

  return shortUrl.short(url, callback);
  // return url


}
const returnEpoch = (dateString) => {
  let epoch = Number(new Date(dateString))
  if (isNaN(epoch)) throw Error(`Not a valid date String `)
  return epoch;
}
const setRecordDate = (date) => {
 return new Date(`${date.toString().split("T")[0]}T00:00:00Z`);
}

const isDate = function (date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const maskedPan = (pan) => {
  orgArr = pan.split('');
  orgArr = orgArr.reverse();
  for (i = 1; i <= 4; i++) {
    orgArr[i] = 'X'
  }
  return (orgArr.reverse().toString().replaceAll(",", ""));
}

const sendSMS = (investorObj, url, callback) => {

  //http://103.16.101.52:8080/bulksms/bulksms?username=DL08-dltkash&password=dltkash@&type=0&dlr=1&destination=${investorObj.uccMobileNo}&source=DLTKTP&message=Please%20confirm%20your%20mobile%20no.%20mapped%20with%20%7B%23vAR%23%7D%7B%23Var%23%7D%20by%20clicking%20on%20the%20%7B%23vAR%23%7D%7B%23Var%23%7D%20-%20DLTKASH&entityid=1601156164334945695&tempid=1607100000000188213
  //PREVIOUS TEST ____---
  // const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=${process.env.RM_USERNAME || 'DL08-dltkash'}&password=${process.env.RM_PASS || 'dltkash@'}&type=0&dlr=1&destination=${investorObj.uccMobileNo}&source=DLTKTP&message=Please%20confirm%20your%20mobile%20no.%20mapped%20with%20${investorObj.uccTmName}%20by%20clicking%20on%20the%20${url}%20-%20DLTKASH&entityid=1601156164334945695&tempid=1607100000000188213`;

  //NEW
  // const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=${process.env.RM_USERNAME || 'DL08-dltkash'}&password=${process.env.RM_PASS || 'dltkash@'}&type=0&dlr=1&destination=${investorObj.uccMobileNo}&source=NSEVER&message=Please%20confirm%20your%20mobile%20no.%20mapped%20with%20${investorObj.uccTmName}%20by%20clicking%20on%20the%20${url}%20-%20NSE&entityid=110100001503&tempid=1107164440900649128`;
  // latest
  const panSms = maskedPan(investorObj.uccPanNo)
  // const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=${process.env.RM_USERNAME || 'KR99-kryptonse'}&password=${process.env.RM_PASS || 'KrypNSE1'}&dlr=1&destination=8360335944&source=NSEVER&message=You%20are%20requested%20to%20confirm%20your%20mobile%20no.%20for%20the%20trading%20account%20with%20%7B%23${investorObj.uccTmName}%23%7D%7B%23var%23%7D%20under%20PAN%7B%23${panSms}%23%7D%20by%20clicking%20on%20the%20%7B%23${url}%23%7D%20%7B%23var%23%7D.%20Also%20confirm%20the%20Email%20address%20by%20clicking%20on%20the%20link%20sent%20on%20your%20registered%20Email%20ID%20-%20NSE&entityid=110100001503&tempid=1107165570218341239`
  // const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=KR99-kryptonse&password=KrypNSE1&type=0&dlr=1&destination=${investorObj.uccMobileNo}&source=NSEVER&message=You%20are%20requested%20to%20confirm%20your%20mobile%20no.%20for%20the%20trading%20account%20with%20${investorObj.uccTmName}%20under%20PAN%20- %20${panSms}20by%20clicking%20on%20the%20${url}%20Also%20confirm%20the%20Email%20address%20by%20clicking%20on%20the%20link%20sent%20on%20your%20registered%20Email%20ID%20-%20NSE&entityid=110100001503&tempid=1107165570218341239`;
  const dltSMS = `http://103.16.101.52:8080/bulksms/bulksms?username=${process.env.RM_USERNAME || 'KR99-kryptonse'}&password=${process.env.RM_PASS || 'KrypNSE1'}&type=0&dlr=1&destination=${investorObj.uccMobileNo}&source=NSEVER&message=You%20are%20requested%20to%20confirm%20your%20mobile%20no.%20for%20the%20trading%20account%20with%20${investorObj.uccTmName}%20under%20PAN%20- %20${panSms}%20by%20clicking%20on%20the%20${url}%20Also%20confirm%20the%20Email%20address%20by%20clicking%20on%20the%20link%20sent%20on%20your%20registered%20Email%20ID%20-%20NSE&entityid=110100001503&tempid=1107165570218341239`;
  const options = {
    'method': 'GET',
    'url': dltSMS,
    'headers': {
      'Content-Type': 'application/json'
    },
  };
  request(options, callback);

}


//UTC+12:00
function returnHours(UTC) {
  var sep;
  const tiemStmp = '12-06-2021 22:30:00 UTC';
  var date = new Date(tiemStmp);
  if (UTC.indexOf('+') != -1) {
    sep = UTC.split('+')[1].split(":")[0];
    date.setHours(date.getUTCHours() - sep);
  } else if (UTC.indexOf('-') != -1) {
    sep = UTC.split('-')[1].split(":")[0];
    date.setHours(date.getUTCHours() + sep);
  } else {
  }

  return date.getUTCHours();
}

const getAttemptsTillDate = (date) => {
  var one_day = 1000 * 60 * 60 * 24
  var present_date = new Date();
  var dt = new Date(date)
  var Result = Math.round(dt.getTime() - present_date.getTime()) / (one_day);
  var Final_Result = Result.toFixed(0);
  return Final_Result
}

module.exports = {
  shortURL,
  totitleCase: totitleCase,
  encryptFormattedUser,
  validateEmail,
  sendSMS,
  getAttemptsTillDate,
  returnHours,
  encryptWithAES,
  removeElement: removeElement,
  encryptString: encryptString,
  getOTP: getOTP,
  returnEpoch,
  setRecordDate,
  isDate,
  sendMail: sendMail,
  decryptWithAES: decryptWithAES,
  createShortNer: createShortNer,
  validateMobile: validateMobile,
}
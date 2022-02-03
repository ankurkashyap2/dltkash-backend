const bcrypt = require('bcryptjs');
const request = require('request');
const CryptoJS = require('crypto-js');
const encryptString = (str) => {
  return bcrypt.hashSync(str, 8);
}

const getOTP = () => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

const sendMail = (email, subject, content, callback) => {
  const options = {
    url: 'https://api.us1-mta1.sendclean.net/v1.0/messages/sendMail',
    json: true,
    body: {
      "message": {
        "to": [{
          "email": email,
        },
        ],
        "html": content,
        "subject": subject,
        "from_email": "no-reply@webmobsoft.com",
        "from_name": "no-reply"
      },
      "owner_id": process.env.SENDCLEANOWNERID,
      "token": process.env.SENDCLEANTOKEN,
      "smtp_user_name": process.env.SENDCLEANSMTPUSERNAME
    }
  };
  request.post(options, callback);
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


module.exports = {
  totitleCase: totitleCase,
  validateEmail,
  encryptWithAES,
  removeElement: removeElement,
  encryptString: encryptString,
  getOTP: getOTP,
  sendMail: sendMail,
}
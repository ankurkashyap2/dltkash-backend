const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const user = require('./models/user');

const encryptString = (str) => {
  return bcrypt.hashSync(str, 8);
}

const getOTP = () => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}

const sendMail = (email, subject, content, callback) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      "user": process.env.EMAILUSER,
      "pass": process.env.EMAILPASS
    }
  });
  let mailOptions = {
    from: "<no_reply@gmail.com>",
    to: email,
    subject: subject,
    html: content,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      {
        console.error("email failed for ", email);
        return callback(error, null);
      }
    }
    console.info("This mail sent to >> " + info.envelope.to);
    return callback(null, info.response);

  });
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



module.exports = {
  totitleCase: totitleCase,
  removeElement: removeElement,
  encryptString: encryptString,
  getOTP: getOTP,
  sendMail: sendMail,
}
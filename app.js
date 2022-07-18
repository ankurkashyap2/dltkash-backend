let express = require('express');
let logger = require('morgan');
const cors = require('cors');
const busboy = require('connect-busboy');
const shortner = require('./models/newSHortner');
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');
let app = express();
const uploadPath = path.join(__dirname, '/unprocessedFiles'); // Register the upload path
fs.ensureDir(uploadPath);
global.__uploadPath = uploadPath;
app.use(bodyParser.json());
global.__root = __dirname + '/';
const db = require('./db');
require('./Cron');
app.use(logger('dev'));
const corsOptions = {}; // exposedHeaders: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type" };
app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.json());
// app.use(bodyParser.json({ limit: '50mb' }));

app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));



app.use('/api/mobile', async (req, res) => {
  try {
    const nanoID = req.path.split('/')[1];
    if (!nanoID) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "No link provided." });
    const askedshortner = await shortner.findOne({ created: nanoID });
    if (!askedshortner) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: "Link Expired !" });
    const redirect = askedshortner.original;
    // return res.json({data: redirect});
    return res.redirect(redirect)
  } catch (error) {
    const error_body = {
      error_message: "Error while redirecting link",
      error_detail: typeof error == "object" ? JSON.stringify(error) : error,
      error_data: req.body,
      api_path: req.path,

      message: error.message
    };
    console.error(error_body);
    return res
      .status(RESPONSE_STATUS.SERVER_ERROR)
      .json({ message: error.message });
  }
});

const UserController = require('./controllers/userController');
app.use('/api/v1/auth', UserController);

const InvestorController = require('./controllers/investorController');
app.use('/api/v1/investors', InvestorController);

const Userv2Controller = require('./controllers/userv2Controller');
app.use('/api/v1/users', Userv2Controller);

const ExchangeController = require('./controllers/exchangeController');
app.use('/api/v1/exchange', ExchangeController);

module.exports = app;
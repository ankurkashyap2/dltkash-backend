let express = require('express');
let logger = require('morgan');
const cors = require('cors');
const busboy = require('connect-busboy');
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
app.use(bodyParser.json({ limit: '50mb' }));

app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));


app.use('/api/v1/test', (req, res) => {
  return res.json({ message: "Request Successful!" });
});

const UserController = require('./controllers/userController');
app.use('/api/v1/auth', UserController);

const InvestorController = require('./controllers/investorController');
app.use('/api/v1/investors', InvestorController);

const ExchangeController = require('./controllers/exchangeController');
app.use('/api/v1/exchange', ExchangeController);

module.exports = app;
let express = require('express');
let logger = require('morgan');
const cors = require('cors');

const session = require('express-session');
var bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
global.__root = __dirname + '/';
const db = require('./db');
app.use(logger('dev'));
const corsOptions = {}; // exposedHeaders: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type" };
app.use(cors(corsOptions));
app.options('*', cors());
// app.use(cors());
app.use(express.json());

app.use('/api/v1/', (req, res) => {
    console.log('Hello');
    return res.json({message:"Request Successful!"});
});

const UserController = require('./controllers/userController');
app.use('/api/v1/auth', UserController);

const InvestorController = require('./controllers/investorController');
app.use('/api/v1/investors', InvestorController);

module.exports = app;
const app = require('./app');
const PORT = process.env.PORT || 3003
const express = require('express');
const router = express.Router();
app.use(router);
const server = app.listen(PORT, function () {
    console.info('Express server listening on port ' + PORT);
});




// 3.95.223.95 @Ankit The node server IP 
// PEM is dltkash pem
// 54.164.43.235 new blockchain server
// PEM is hyperledgerfabric pem
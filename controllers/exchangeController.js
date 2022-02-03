const validator = require("./../validators/exchangeValidator");
const { verifyToken } = require("../auth/verifyToken");
const express = require('express');
const exchangeServices = require('./../services/exchangeServices');
const router = express.Router();
router.use(validator);
router.use(verifyToken);

router.get('/verifyRequest', exchangeServices.fetchInvestorsAndSendToBlockchain);
module.exports = router;
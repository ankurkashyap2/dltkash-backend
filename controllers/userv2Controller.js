const validator = require("./../validators/userv2Validator.js");
const { verifyToken } = require("../auth/verifyToken");
const express = require('express');
const userv2Services = require('./../services/userv2Services.js');
const router = express.Router();
router.use(validator);
router.use(verifyToken);

router.post('/fetchInvestors', userv2Services.getInvestorByDate);
module.exports = router;
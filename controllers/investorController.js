const validator = require("./../validators/investorValidator");
const { verifyToken } = require("../auth/verifyToken");
const express = require('express');
const investorServices = require('./../services/investorServices');
const router = express.Router();
router.use(validator);
router.use(verifyToken);

router.get('/send-verification/email', investorServices.sendInvestorEmailForVerification);
router.post('/verify/email', investorServices.investorEmailVerify);
router.post('/verify/mobile', investorServices.investorMobileVerify);
router.post('/get-data', investorServices.getInvestorDetailByUccId);
router.post('/data-by-fileName',investorServices.dataByFile),
router.post('/create-investor', investorServices.addSingleInvestor);
router.post('/bulk/create-investor', investorServices.addBulkinvestors);
router.post('/sendclean-webhook', investorServices.sendCleanWebHook);
router.post('/updateInvestor', investorServices.updateInvestor);
module.exports = router;
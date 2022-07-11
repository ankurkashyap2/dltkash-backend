const cron = require('node-cron');
const { UCC_REQUEST_TYPES } = require('./constants');
const cronServices = require('./services/cronServices');

// CRON RUN AT  EVERY 4 HOURS TO CHECK FOR UNPROCESSED FILES ON SERVER
// 0 */4 * * *
// cron.schedule('* * * * *', () => {
//     console.info("CRON RUN EVERY 10 MINS TO CHECK FOR UNPROCESSED FILES ON SERVER =>", (new Date()).toUTCString());
//     const today = new Date();
//     var isWeekend = today.getDay() == 0
//     if (isWeekend) return;
//     cronServices.checkForUnprocessedFiles().then(() => { });

// });


// CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED
cron.schedule('*/30 * * * * *', () => {
    try {
        console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.MODIFIED).then(() => {

        });
    } catch (err) {
        console.log(err)
    }
});

// CRON RUN EVERYDAY AT 11AM FOR REQUEST_TYPE>>>>>>>>NEW
// cron.schedule('*/2 * * * *', () => {
//     try {
//         console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>NEW =>", (new Date()).toUTCString());
//         cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.NEW).then(() => {

//         });
//     } catch (err) {
//         console.log(err)
//     }
// });

// CRON RUN EVERYDAY AT 7PM FOR REQUEST_TYPE>>>>>>>>EXISTING
// cron.schedule('*/30 * * * * *', () => {
//     try {
//         console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>EXISTING =>", (new Date()).toUTCString());
//         cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.EXISTING).then(() => {
//         });
//     } catch (err) {
//         console.log(err)
//     }
// });
const cron = require('node-cron');
const { UCC_REQUEST_TYPES } = require('./constants');
const cronServices = require('./services/cronServices');


// // CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED
// cron.schedule('*/5 * * * *', () => {
//     try {
//         console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED =>", (new Date()).toUTCString());
//         cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.MODIFIED).then(() => {

//         });
//     } catch (err) {
//         console.log(err)
//     }
// });

// // CRON RUN EVERYDAY AT 11AM FOR REQUEST_TYPE>>>>>>>>NEW
cron.schedule('*/2 * * * *', () => {
    try {
        console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>NEW =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.NEW).then(() => {

        });
    } catch (err) {
        console.log(err)
    }
});

// // CRON RUN EVERYDAY AT 7PM FOR REQUEST_TYPE>>>>>>>>EXISTING
// cron.schedule('*/5 * * * *', () => {
//     try {
//         console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>EXISTING =>", (new Date()).toUTCString());
//         cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.EXISTING).then(() => {
//         });
//     } catch (err) {
//         console.log(err)
//     }
// });

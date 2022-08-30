const cron = require('node-cron');
const { UCC_REQUEST_TYPES } = require('./constants');
const cronServices = require('./services/cronServices');
const FilesLogs = require("./models/filesLogs");


// // CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED
cron.schedule('*/3 * * * *', () => {
    try {
        console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>MODIFIED =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.MODIFIED).then(() => {

        });
    } catch (err) {
        console.log(err)
    }
});

// // CRON RUN EVERYDAY AT 11AM FOR REQUEST_TYPE>>>>>>>>NEW
cron.schedule('*/3 * * * *', () => {
    try {
        console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>NEW =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.NEW).then(() => {

        });
    } catch (err) {
        console.log(err)
    }
});

// // CRON RUN EVERYDAY AT 7PM FOR REQUEST_TYPE>>>>>>>>EXISTING
cron.schedule('*/3 * * * *', () => {
    try {
        console.info("CRON RUN EVERYDAY AT 4:30PM FOR REQUEST_TYPE>>>>>>>>EXISTING =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic(UCC_REQUEST_TYPES.EXISTING).then(() => {
        });
    } catch (err) {
        console.log(err)
    }
});

//AT 12:00 AM morning
cron.schedule('*/5 * * * *', async() => {
    try {
        console.info("CRON RUN EVERYDAY AT 12:00AM TO EMPTY FILES PROCESS TODAY", (new Date()).toUTCString());
        const fileLogs = await FilesLogs.find();
        fileLogs[0].filesProcessToday = [];
        fileLogs[0].save();
    } catch (err) {
        console.log(err)
    }
});
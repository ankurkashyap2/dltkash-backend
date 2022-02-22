const cron = require('node-cron')
const cronServices = require('./services/cronServices');


//CRON RUN AT  EVERY 4 HOURS TO CHECK FOR UNPROCESSED FILES ON SERVER
//0 */4 * * *
cron.schedule('* * * * *', () => {
    console.info("CRON RUN AT  EVERY 4 HOURS TO CHECK FOR UNPROCESSED FILES ON SERVER =>", (new Date()).toUTCString());
    const today = new Date();
    var isWeekend = today.getDay() == 0
    if (isWeekend) return;
    cronServices.checkForUnprocessedFiles().then(() => { });
});


//CRON RUN EVERY 30 MINUTES TO FETCH USERS FOR NOTIFICATIONS
cron.schedule('0,30 * * * *', () => {
    console.info("CRON RUN EVERY 30 MINUTES TO FETCH USERS FOR NOTIFICATIONS =>", (new Date()).toUTCString());
    cronServices.notificationSendingLogic.then(() => { });
});
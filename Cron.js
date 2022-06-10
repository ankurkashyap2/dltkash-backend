const cron = require('node-cron')
const cronServices = require('./services/cronServices');


// CRON RUN AT  EVERY 4 HOURS TO CHECK FOR UNPROCESSED FILES ON SERVER
// 0 */4 * * *
cron.schedule('*/10 * * * *', () => {
    console.info("CRON RUN EVERY 10 MINS TO CHECK FOR UNPROCESSED FILES ON SERVER =>", (new Date()).toUTCString());
    const today = new Date();
    var isWeekend = today.getDay() == 0
    if (isWeekend) return;
    cronServices.checkForUnprocessedFiles().then(() => { });

});


// CRON RUN EVERY 30 MINUTES TO FETCH USERS FOR NOTIFICATIONS 
cron.schedule('*/30 * * * *', () => {
    try {
        console.info("CRON RUN EVERY HOUR TO FETCH USERS FOR NOTIFICATIONS =>", (new Date()).toUTCString());
        cronServices.notificationSendingLogic().then(() => {
            
        });
    } catch (err) {
    
        console.log(err)
    }
});

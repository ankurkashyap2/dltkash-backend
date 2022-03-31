const rabbit = require('amqplib');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'BASE';
const KEY = 'myKey';
const numbers = [
    {
        "uccRequestId": "234718212902",
        "uccTmId": "98234921",
        "uccTmName": "Zerodha",
        "uccPanExempt": "false",
        "uccPanNo": "COMPA44565A",
        "uccCountry": "India",
        "uccMobileNo": "9877114806",
        "uccEmailId": "ankit@getnada.com",
        "uccMobileNoModified": "false",
        "uccEmailIdModified": "false",
        "uccDpId": "2384092431",
        "uccClientId": "82340918043",
        "uccInvestorCode": "18293",
        "uccRequestType": "NEW",
        "uccNodeStatus": "01",
        "uccEmailStatus": "VERIFIED",
        "uccMobileStatus": "VERIFIED",
        "uccPanStatus": "VERIFIED",
        "emailAttempts": "1",
        "mobileAttempts": "3",
        "ledgerId1": "org.property-registration-network.investor.requestrahul123-rahul11",
        "ledgerid2": "org.property-registration-network.investor.requestrahul123-ayush@gmail.com-91222122-rahul11",
        "isEmailEncrypted": "false",
        "isPhoneEncrypted": "false",
        "UTCNotification": "15:00"
    }
    
]

connection = rabbit.connect("amqps://huhhlhxs:KoDjemkJAycRzCN0ZQIAQ2wrWkbHCAWB@brilliant-cobalt-owl.rmq3.cloudamqp.com/huhhlhxs");
connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    for (i = 0; i < 10; i++) {
        numbers.forEach((number) => {
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(number)))
        })
    }
    // setTimeout(function () { conn.close(); console.log("Close"); process.exit(0); }, 10000);
});
const rabbit = require('amqplib');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'BASE';
const KEY = 'myKey';
const numbers = [
    {
                    "emailProcessed": true,
                    "mobileProcessed": true,
                    "uccClientId": "82340918043",
                    "uccCountry": "India",
                    "uccDpId": "2384092431",
                    "uccEmailId": "ankit3@getnada.com",
                    "uccEmailIdModified": "false",
                    "uccEmailStatus": "SENT",
                    "uccInvestorCode": "18293",
                    "uccMobileNo": "9877114806",
                    "uccMobileNoModified": "false",
                    "uccMobileStatus": "VERIFIED",
                    "uccNodeStatus": "01",
                    "uccNotification": "15",
                    "uccPanExempt": "false",
                    "uccPanNo": "COMPA44565A",
                    "uccPanStatus": "VERIFIED",
                    "uccRequestId": "156621290112",
                    "uccRequestType": "NEW",
                    "uccTmId": "398234921",
                    "uccTmName": "Zerodha",
                    "updatedAt": "1651257000000"
    }
    
]
pw ='amqps://admin:uaHFhFb90g1acugStY7SclkVHkkMCnPC@u8y0rp.stackhero-network.com:5671'


connection = rabbit.connect(pw);
connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    for (i = 0; i < 10000; i++) {
        numbers.forEach((number) => {
            number.uccRequestId = i.toString()
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(number)))
        })
    }
    // setTimeout(function () { conn.close(); console.log("Close"); process.exit(0); }, 10000);
});
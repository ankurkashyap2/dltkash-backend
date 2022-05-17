const rabbit = require('amqplib');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'BASE';
const KEY = 'myKey';
const numbers = [
    {
                    "emailProcessed": true,
                    "mobileProcessed": true,
                    "uccClientId": "823409180434",
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
    for (i = 0; i < 1000; i++) {
        numbers.forEach((number) => {
            number.uccRequestId = `${i}x`
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(number)))
        })
    }
    // setTimeout(function () { conn.close(); console.log("Close"); process.exit(0); }, 10000);
});



// module.exports = {
//     apps: [{
//         name: 'DLTKASH-UAT',
//         script: 'server.js',
//         autorestart: true,
//         watch: false,
//         ignore_watch: [".git", "**/node_modules/**"],
//         watch_options: {
//             followSymlinks: false,
//             persistent: true,
//             // usePolling: true,
//             ignoreInitial: true
//         },
//         env: {
//                 PORT: 3003,
//                 DBURI:'mongodb+srv://DLTkash:Wpadmin123@dltkashcluster.sjpzq.mongodb.net/test',
//                 JWTSECRET:'DLTKASH+++++123Xvc45782dbvd$%&^%',
//                 EMAILUSER:'dltkash.dev@gmail.com',
//                 EMAILPASS:'Wpadmin123#',
//                 SENDCLEANTOKEN:'2bZ1zHM3tNHK43DotA9DfAdF',
//                 SENDCLEANOWNERID:'80940214',
//                 SENDCLEANSMTPUSERNAME:'smtp34269159',
//                 FEHOST:'https://uat.dltkash.com',
//                 PROCESS_QUEUE:"amqps://ozeiszoe:7mESUDeEhObDqs8FOIDIPyKDCq9Pt9vf@armadillo.rmq.cloudamqp.com/ozeiszoe",
//                 HYPERLEDGER_HOST : 'https://dltkash.ddns.net/api',
//                 S3ACCESSKEYID:'AKIA3OUK3YH4WGMORGDG',
//                 S3SECRETACCESSKEY: '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',
//                 RM_USERNAME:'DL08-dltkash',
//                 RM_PASS:'dltkash@',
//                 BUCKET_NAME:'dltkash-test'
//         },
//         debug: true,
//         max_memory_restart: '1G',
//         log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
//     }]
// };

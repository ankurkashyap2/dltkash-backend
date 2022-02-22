const rabbit = require('amqplib');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
connection = rabbit.connect('amqps://ozeiszoe:7gYRxai3pEeQQA5qwU78RUnaz1Y7QFvH@armadillo.rmq.cloudamqp.com/ozeiszoe');

connection.then(async (conn) => {
    const channel = await conn.createChannel();
    channel.consume(QUEUE_NAME, (m) => {
        const investorObj = m.content.toString();
        console.log('<<<',JSON.parse(investorObj),'>>>>')
        channel.ack(m)
        // setTimeout(function () { conn.close(); console.log("Close"); process.exit(0); }, 500);
    })
})
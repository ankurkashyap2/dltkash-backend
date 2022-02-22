const fs = require('fs')
const { Rabbit } = require('rabbit-queue');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'BASE';
const KEY = 'myKey';
const JSONStream = require('JSONStream');
// const { readable } = require('event-stream');



const readAndWriteQueue = async () => {
    const connection = await rabbit.connect("amqps://ozeiszoe:7gYRxai3pEeQQA5qwU78RUnaz1Y7QFvH@armadillo.rmq.cloudamqp.com/ozeiszoe");
    const fileToRead = '/home/ankit/Desktop/DLTKash/small.json';
    const readable = fs.createReadStream(fileToRead,).pipe(JSONStream.parse('table.*'));
    const channel = await connection.createChannel();
    // await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    // await channel.assertQueue(QUEUE_NAME);
    // channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    console.log('6')
    // readable.on('data', (JsonObj) => {
    //     console.log(JsonObj)
    //     // if (JsonObj)
    //         // channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(JsonObj)));
    //     // console.log(JsonObj);
    //     console.log('7')
    //     connection.close(); console.log("Close"); process.exit(0);
    // });
    for (const i in [1, 2, 3, 4, 5, 4, 4, 4, 44, 4, 4, 4, 4, 4]) {
        // console.log({i})
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({ "sdf": "i" })))
    }
    // setTimeout(function () { }, 5000);
    // readable.on('end', () => {
    //     console.log('processed success');
    // })

}




// fileToRead = '/home/ankit/Desktop/DLTKash/small.json';
// readable = fs.createReadStream(fileToRead,).pipe(JSONStream.parse('table.*'));
// readable.on('data', (JsonObj) => {
//     console.log(JsonObj.uccCountry)

// });


const fileToProcess = async () => {
    const rabbit = new Rabbit('amqps://ozeiszoe:7gYRxai3pEeQQA5qwU78RUnaz1Y7QFvH@armadillo.rmq.cloudamqp.com/ozeiszoe', {
        prefetch: 1, //default prefetch from queue
        replyPattern: true, //if reply pattern is enabled an exclusive queue is created
        scheduledPublish: false,
        prefix: '', //prefix all queues with an application name
        socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
    });
    fileToRead = '/home/ankit/Desktop/DLTKash/small.json';
    let readable = fs.createReadStream(fileToRead,).pipe(JSONStream.parse('table.*'));
    readable.on('data', (JsonObj) => {
        rabbit.publish(QUEUE_NAME, JsonObj, { correlationId: '1' }).then(() => console.log('message published'));

    });
    readable.on('end', () => {
        return ;
    });
    // await rabbit.createQueue(QUEUE_NAME, { durable: false, prefetch: 100 }, (msg, ack) => {
    //     console.log(msg.content.toString());
    //     ack(null, 'response');
    // });




}






fileToProcess();

// readAndWriteQueue();

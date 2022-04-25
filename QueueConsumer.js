const rabbit = require('amqplib');
const QUEUE_NAME = 'INVESTORS_DATA_BUFF';
pw ='amqps://admin:uaHFhFb90g1acugStY7SclkVHkkMCnPC@u8y0rp.stackhero-network.com:5671'
connection = rabbit.connect(pw);

function doSomething(){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, 1);
    })
}

connection.then(async (conn) => {
    const channel = await conn.createChannel();
    // channel.get(QUEUE_NAME, (m) => {
    //     const investorObj = m.content.toString();
    //     console.log('<<<',JSON.parse(investorObj),'>>>>')
    //     channel.ack(m)
    //     // setTimeout(function () { conn.close(); console.log("Close"); process.exit(0); }, 500);
    // })
    while(true){
        let msg = await channel.get(QUEUE_NAME);
        if(!msg) break;
        console.log(JSON.parse(msg.content.toString()))
        // await doSomething();  
              channel.ack(msg)

    }
})

const fs = require('fs')
let readable = fs.createReadStream('/home/ankit/Desktop/DLTKash/SDocs/5m-Sales-Records/5m Sales Records.csv');
const stream = require('stream');
//  /home/ankit/Desktop/DLTKash/SDocs/5m-Sales-Records/5m Sales Records.csv

function aXD() {

    // readable.on('data', async (chunk) => {
    //     try{
     
    //     console.log(chunk.toString())
      
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    fs.readFile('/home/ankit/Desktop/DLTKash/SDocs/5m-Sales-Records/5m Sales Records.csv', function(err, data) {
        console.log(data.toString());
    })
   
}
// aXD()
class PushToSqs extends stream.Transform {
	constructor(options = {}) {
		super({ ...options, objectMode: true })
		// Create an SQS service object
	
		
	}
	
	async _transform(chunk, encoding, done) {
		try {
			this.data+=this.data;
			console.log(chunk.toString())
            setTimeout(() => {  console.log("World!"); }, 2000);
            console.log(this.data.length);
            done();
			
		} catch (error) {
			done(error)
		}
	}

	// sendBatchMsgToSqs(csvRow) {
	// 	let sqsReq = {
	// 		MessageBody: csvRow,
	// 		QueueUrl: '<your sqs queue endpoint>'
	// 	}
	// 	return new Promise((resolve, reject) => {
	// 		this.sqs.sendMessage(sqsReq, function(err, data) {
	// 			if (err) {
	// 				reject()
	// 			} else {
	// 				//all msgs sent successfully
	// 				resolve()
	// 			}
	// 		})
	// 	})
	// }
}

readable.pipe(new PushToSqs())
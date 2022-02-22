const fs = require('fs')
const stream = require('stream');
JSONStream = require('JSONStream');
const request = require('request');
es = require('event-stream')
let readable = fs.createReadStream('/home/ankit/Desktop/DLTKash/small.json',).pipe(JSONStream.parse('table.*'));

//  /home/ankit/Desktop/DLTKash/SDocs/5m-Sales-Records/5m Sales Records.csv

// function aXD() {

// readable.on('data', async (chunk) => {
//     try{

//     console.log(chunk.toString())

//     } catch (error) {
//         console.log(error)
//     }
// })
// fs.readFile('/home/ankit/Desktop/DLTKash/SDocs/5m-Sales-Records/5m Sales Records.csv', function (err, data) {
// 	console.log(data.toString());
// })

// }
// aXD()

let allData = "";
class PushToSqs extends stream.Transform {
	constructor(options = {

	}) {
		super({ ...options, objectMode: true, })
		// Create an SQS service object
		if (typeof String.prototype.replaceAll === "undefined") {
			String.prototype.replaceAll = function (match, replace) {
				return this.replace(new RegExp(match, 'g'), () => replace);
			}
		}
	}




	async _transform(chunk, encoding, done) {
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

// readable.pipe(new PushToSqs())
// readable.on('end', (asd) => {
// 	const result = JSON.parse(allData)
// 	console.log('sdfs =>', result.table.length)
// 	for (const a in result.table.slice(0,100)) {
// 		console.log(a);
// 	}
// });

readable.on('data', (jsonObj) => {

})



readable.on('end', () => {
	console.log('processed success');
})

// operateJson();
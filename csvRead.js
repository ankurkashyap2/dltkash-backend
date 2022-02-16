const fs = require('fs')
const stream = require('stream');
JSONStream = require('JSONStream')
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
let investorsDataChunk = [];
c = 0;
readable.on('data', (JsonObj) => {
	investorsDataChunk.push(JsonObj);
	if (investorsDataChunk.length == 2) {
		var options = {
			'method': 'POST',
			'url': `https://summer-thunder-86958.pktriot.net/users/createInvestors`,
			'headers': {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"investorsData": [
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
					},
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
					},
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
					},
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
					},
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
					},
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
					},
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
					},
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
					},
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
					},
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


			})
		};

		Promise.resolve([
			request(options, function (error, response) {
				c++;
				console.log('response>>', response.body);
			})
		])
		investorsDataChunk = [];
	}
});




readable.on('end', () => {
	console.log('processed success');
})

// operateJson();
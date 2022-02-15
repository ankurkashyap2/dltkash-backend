const fs = require('fs')
const stream = require('stream');
const JSONStream = require('JSONStream')
const investorFunctions = require('./investorFunctions');
let readable;
let fileToRead;


const fileToProcess = () => {
    //file to process logic
    fileToRead = '/home/ankit/Desktop/DLTKash/testJson.json';
    readable = fs.createReadStream(fileToRead,).pipe(JSONStream.parse('table.*'));
}


const readFile = () => {
    let investorsDataChunk = [];
    readable.on('data', (JsonObj) => {
        investorsDataChunk.push(JsonObj);
        if (investorsDataChunk.length == 10) {
            Promise.resolve(investorFunctions.operateInvestorsObject(investorsDataChunk));
            investorsDataChunk = [];
        }
    });
    readable.on('end', () => {
        console.log('processed success');
    })

}



fileToProcess();
readFile();
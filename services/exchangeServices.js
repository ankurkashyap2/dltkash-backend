const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./../constants');
const RecordFile = require('./../models/fileSpecs');
const fs = require('fs-extra');
const path = require('path');

//`/home/ankit/Desktop/DLTKash/unprocessedFiles/${filename.filename}`

const uploadFileToServer = async (req, res) => {
    try {
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, filename) => {
            if (filename.mimeType != 'application/json') return res.status(RESPONSE_STATUS.CONFLICT).json({ message: 'Only JSON files are accepted.' });
            console.log(`Upload of '${filename.filename}' started`);
            const fstream = fs.createWriteStream(path.join(__uploadPath,filename.filename));
            file.pipe(fstream);
            fstream.on('close', () => {
                console.log(`Upload of '${filename.filename}' finished`);
                const recordFileObj = {
                    fileName: filename.filename,
                    status: "UNPROCESSED"
                }
                RecordFile.create(recordFileObj);
                return res.status(RESPONSE_STATUS.SUCCESS).json({ message: "File upload success." });
            });
            fstream.on('error', (error) => {
                console.log(error);
                return res.status(RESPONSE_STATUS.CONFLICT).json({ message: "File upload error." });
            });
        });

    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while loading files to server",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}


const getFilesStatus = async (req, res) => {
    try {
        const recordFiles = await RecordFile.find();
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data: recordFiles });

    } catch (error) {
        const error_body = {
            stack: error.stack,
            error_message: "Error while sending files status",
            error_detail: typeof error == "object" ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
        };
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.message });
    }
}

module.exports = {
    uploadFileToServer,
    getFilesStatus
}
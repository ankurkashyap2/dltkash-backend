const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./../constants');
const RecordFile = require('./../models/fileSpecs');
const fs = require('fs-extra');
const path = require('path');
const request = require('request')

const uploadFileToServer = async (req, res) => {
    try {
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, filename) => {
            if (filename.mimeType != 'application/json') return res.status(RESPONSE_STATUS.CONFLICT).json({ message: 'Only JSON files are accepted.' });
            console.log(`Upload of '${filename.filename}' started`);
            const fstream = fs.createWriteStream(path.join(__uploadPath, filename.filename));
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

const search = async (req, res) => {
    try {
        const { page, limit, TmName, mobileNumber, panNumber, notificationKey } = req.query;
        const body = {
            "page": page || 1,
            "limit": limit || 100
        };
        if (mobileNumber) body.mobileNumber = mobileNumber
        else if (TmName) body.TmName = TmName
        else if (panNumber) body.panNumber = panNumber
        else if (notificationKey) body.notificationKey = notificationKey
        var options = {
            'method': 'POST',
            'url': `${process.env.HYPERLEDGER_HOST}/users/getInvestorsByKey`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        request(options, function (error, response) {
            if (error) return res.status(error.status).json({ message: RESPONSE_MESSAGES.SERVER_ERROR, detail: error.toString() });
    
            return res.status(response.statusCode || 500).json({ data: JSON.parse(response.body) || "SERVER ERRROR" });
        });
       

        
    } catch (error) {
        const error_body = {
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        }
        console.error(error.stack);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.stack });
    }
}

module.exports = {
    uploadFileToServer,
    getFilesStatus,
    search
}
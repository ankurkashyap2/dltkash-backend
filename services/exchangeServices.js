const { RESPONSE_MESSAGES, RESPONSE_STATUS } = require('./../constants');
const RecordFile = require('./../models/fileSpecs');
const fs = require('fs-extra');
const path = require('path');
const request = require('request')
const User = require('./../models/user');
const Exchange = require('./../models/exchange');
const mongoose = require('mongoose');
const FilesLogs = require('./../models/filesLogs');
const cronServices = require('./cronServices');
const commonFunctions = require('../commonFunctions');
const uploadFileToServer = async (req, res) => {
    try {
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, filename) => {
            if (filename.mimeType != 'application/json') return res.status(RESPONSE_STATUS.CONFLICT).json({ message: 'Only JSON files are accepted.!' });
            const fstream = fs.createWriteStream(path.join(__uploadPath, filename.filename));
            file.pipe(fstream);
            fstream.on('close', async () => {
                console.log(`Upload of '${filename.filename}' finished`);
                const alreadyExsits = await RecordFile.find({ fileName: filename.filename });
                if (alreadyExsits.length) return res.status(RESPONSE_STATUS.CONFLICT).json({ message: "RecordFile with same Name already Exsits!" });
                const recordFileObj = {
                    fileName: filename.filename,
                    status: "UNPROCESSED",
                    exchangeId: askedUser.exchangeId
                }
                const FileForSearch = await RecordFile.create(recordFileObj);
                const FileForSearch_id = FileForSearch._id;
                cronServices.checkForUnprocessedFiles(FileForSearch_id).then(() => { });
                const fileLogs = await FilesLogs.find();
                if (fileLogs.length == 0) {
                    const fileLogObj = {
                        filesProcessToday: [FileForSearch.fileName]
                    };
                    FilesLogs.create(fileLogObj);
                } else {
                    fileLogs[0].filesProcessToday.push(FileForSearch.fileName);
                    fileLogs[0].save();
                }
                return res.status(RESPONSE_STATUS.SUCCESS).json({ message: "File upload success.And Processing started.!" });
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
        const { fileName } = req.body;
        let recordFiles;
        if (fileName) {
            recordFiles = await RecordFile.find({ fileName: fileName.trim() });
        } else
            recordFiles = await RecordFile.find();
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
        const askedUser = await User.findOne({
            _id: mongoose.Types.ObjectId(req.user_id)
        });
        const { page, limit, TmName, mobileNumber, panNumber, notificationKey } = req.query;
        const body = {
            "page": page || 1,
            "limit": limit || 100,
            "exchangeId": askedUser.exchangeId
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

//MM//DD//YY
const updateDueDate = async (req, res) => {
    try {
        const { newAttempts, existingDate, existingAttempts, modifiedAttempts, exchangeId } = req.body;
        const askedExchange = await Exchange.findOne({ _id: mongoose.Types.ObjectId(exchangeId) });
        if (newAttempts) { askedExchange.newAttempts = parseInt(newAttempts); }
        if (modifiedAttempts) { askedExchange.modifiedAttempts = parseInt(modifiedAttempts); }
        if (existingDate) {
            if (!commonFunctions.isDate(existingDate)) return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Exisitng date not in format!" });
            askedExchange.existingDate = existingDate;
            askedExchange.isExisitngDateSelected = true;
            askedExchange.existingAttempts = parseInt(commonFunctions.getAttemptsTillDate(existingDate));
        } else if (existingAttempts) {
            askedExchange.existingDate = '';
            askedExchange.isExisitngDateSelected = false;
            askedExchange.existingAttempts = parseInt(existingAttempts);
        }
        askedExchange.save();
        return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data: askedExchange });
    } catch (error) {
        const error_body = {
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path,
            stack: error.stack
        }
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: error.stack });
    }
}

module.exports = {
    uploadFileToServer,
    updateDueDate,
    getFilesStatus,
    search
}
const bucket = require("aws-sdk");

const s3 = new bucket.S3({
    accessKeyId: process.env.S3ACCESSKEYID,
    secretAccessKey: process.env.S3SECRETACCESSKEY,
});
function fileUpload(folder, fileName, content) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${folder}/${fileName}`, // File name you want to save as in S3
            Body: content,
        };
        // Uploading files to the bucket
        s3.upload(params, function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data.Location);
        });
    });
}

function fileDownload({ filename, folder, returnType }) {
    const s3Object = s3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folder}/${filename.trim()}`,
    });
    if (!returnType || returnType === "stream") {
        return s3Object.createReadStream();
    }
    if (returnType === "buffer") {
        return s3Object.promise();
    }
    throw new Error("Type did not match.");
}

function deleteFile(key) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
    };
    return s3.deleteObject(params).promise();
}



module.exports = {
    
    fileUpload,
    fileDownload,
    deleteFile,
};

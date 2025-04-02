// utils/uploadToGoogleCloud.js
const { storage, bucketName } = require('./storageConfig');

const uploadImageToCloud = async (file) => {
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(`expenses/${Date.now()}-${file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImageToCloud };

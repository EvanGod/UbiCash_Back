// utils/storageConfig.js
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Ruta del archivo de credenciales JSON
const storage = new Storage({
  keyFilename: path.join(__dirname, '..', 'practicas-448800-7f81b2c2a301.json'),
});

const bucketName = 'ubicash'; 

module.exports = { storage, bucketName };

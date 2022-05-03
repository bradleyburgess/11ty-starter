const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const dir = require('../../constants/dir');
const generateHashedFiles = require('./generateHashedFiles');

const writeFile = promisify(fs.writeFile);

const hashedFiles = generateHashedFiles();

module.exports = async () => {
  await writeFile(path.join(dir.input, dir.data, 'hash.json'), JSON.stringify(hashedFiles))
    .then(() => console.log("hash values set to ''"))
    .catch((err) => console.log('hash.json not written:', err));
};

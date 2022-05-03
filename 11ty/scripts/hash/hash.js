const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const md5 = require('md5');
const generateHashedFiles = require('./generateHashedFiles');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const rename = promisify(fs.rename);

const dir = require('../../constants/dir');

const genFilePath = (filename) => {
  const { base, ext } = path.parse(filename);
  const type = ext.replace(/^\./, '');

  if (!['css', 'js'].includes(type))
    throw new Error('Unknown file type in parcel targets! Check package.json');

  return path.join(dir.output, type, base);
};

const hashedFiles = generateHashedFiles();

module.exports = async () => {
  // CSS
  const cssPromises = Object.keys(hashedFiles.css).map(async (filebase) => {
    const origFilePath = path.join(dir.output, 'css', filebase + '.css');
    await readFile(origFilePath).then(async (buffer) => {
      const hash = md5(buffer).slice(0, 16);
      console.log(`${filebase}.css hash: ${hash}`);
      const hashedFilePath = path.join(dir.output, 'css', `${filebase}${hash}.css`);
      await rename(origFilePath, hashedFilePath);
      console.log(`Renamed bundled ${filebase}.css to ${hashedFilePath}`);
      hashedFiles.css[filebase] = hash;
    });
  });

  // JS
  const jsPromises = Object.keys(hashedFiles.js).map(async (filebase) => {
    const origFilePath = path.join(dir.output, 'js', filebase + '.js');
    await readFile(origFilePath).then(async (buffer) => {
      const hash = md5(buffer).slice(0, 16);
      console.log(`${filebase}.js hash: ${hash}`);
      const hashedFilePath = path.join(dir.output, 'js', `${filebase}${hash}.js`);
      await rename(origFilePath, hashedFilePath);
      console.log(`Renamed bundled ${filebase}.js to ${hashedFilePath}`);
      hashedFiles.js[filebase] = hash;
    });
  });

  // Write hashes to data for 11ty
  await Promise.all([...cssPromises, ...jsPromises]);
  await writeFile(path.join(dir.input, dir.data, 'hash.json'), JSON.stringify(hashedFiles)).then(
    () => console.log('Wrote data to hash.json')
  );
};

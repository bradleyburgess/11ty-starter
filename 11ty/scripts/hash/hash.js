const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const md5 = require('md5');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const rename = promisify(fs.rename);

const dir = require('../../constants/dir');

const cssFilePath = path.join(dir.output, 'css', 'index.css');
const jsFilePath = path.join(dir.output, 'js', 'index.js');

const hashedFiles = {
  css: '',
  js: '',
};

module.exports = async () => {
  // CSS
  await readFile(cssFilePath).then(async (buffer) => {
    const hash = md5(buffer).slice(0, 16);
    console.log(`CSS hash: ${hash}`);
    const hashedCssFilePath = path.join(dir.output, 'css', `index${hash}.css`);
    await rename(cssFilePath, hashedCssFilePath);
    console.log(`Renamed bundled CSS file to ${hashedCssFilePath}`);
    hashedFiles.css = hash;
  });

  // JS
  await readFile(jsFilePath).then(async (buffer) => {
    const hash = md5(buffer).slice(0, 16);
    console.log(`JS hash: ${hash}`);
    const hashedJsFilePath = path.join(dir.output, 'js', `index${hash}.js`);
    await rename(jsFilePath, hashedJsFilePath);
    console.log(`Renamed bundled JS file to ${hashedJsFilePath}`);
    hashedFiles.js = hash;
  });

  // Write hashes to data for 11ty
  await writeFile(path.join(dir.input, dir.data, 'hash.json'), JSON.stringify(hashedFiles)).then(
    () => console.log('Wrote data to hash.json')
  );
};

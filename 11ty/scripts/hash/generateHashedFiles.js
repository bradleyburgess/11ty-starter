const pkg = require('../../../package.json');
const path = require('path');

module.exports = function () {
  const cssSource = pkg.targets.css.source;
  const jsSource = pkg.targets.js.source;

  let cssTargets = Array.isArray(cssSource) ? cssSource : [cssSource];
  let jsTargets = Array.isArray(jsSource) ? jsSource : [jsSource];

  cssTargets = cssTargets.map((target) => path.parse(target).name);
  jsTargets = jsTargets.map((target) => path.parse(target).name);

  const hashedFiles = {
    css: Object.assign({}, ...cssTargets.map((src) => ({ [src]: '' }))),
    js: Object.assign({}, ...jsTargets.map((src) => ({ [src]: '' }))),
  };

  return hashedFiles;
};

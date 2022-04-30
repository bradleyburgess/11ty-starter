const { format } = require('prettier');

const parser = 'html';

module.exports = function (content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    return format(content, { parser });
  }
  return content;
};

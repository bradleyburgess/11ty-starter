const markdownIt = require('markdown-it');
const md = new markdownIt({ html: true });

module.exports = function (content) {
  return md.render(content);
};

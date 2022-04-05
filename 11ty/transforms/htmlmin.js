const { minify } = require('html-minifier');

const htmlminOptions = {
  useShortDoctype: true,
  removeComment: true,
  collapseWhitespace: true,
};

module.exports = function (content, outputPath) {
  if (process.env.NODE_ENV !== 'production') return content;
  if (!outputPath || !outputPath.endsWith('.html')) return content;
  const minified = minify(content, htmlminOptions);
  return minified;
};

const Terser = require('terser');

module.exports = function (code) {
  if (process.env.NODE_ENV === 'production') {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }

    return minified.code;
  }

  return code;
};

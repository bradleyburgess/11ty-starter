const CleanCSS = require('clean-css');

module.exports = function (code) {
  if (process.env.NODE_ENV === 'production') {
    try {
      const css = new CleanCSS({}).minify(code).styles;
      return css;
    } catch (error) {
      console.log('Error minifying css!:');
      console.log(error);
    }
  }
  return code;
};

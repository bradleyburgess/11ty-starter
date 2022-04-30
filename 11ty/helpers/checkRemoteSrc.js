module.exports = function (src) {
  return src.startsWith('https://') || src.startsWith('http://');
};

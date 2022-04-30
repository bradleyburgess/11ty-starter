module.exports = function (input) {
  return input.replace(/"/g, "'").replace(/&/g, '&amp;').replace(/`/g, '');
};

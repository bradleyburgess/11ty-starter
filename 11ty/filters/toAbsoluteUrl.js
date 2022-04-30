const sitemeta = require('../../src/_data/sitemeta.json');

module.exports = function (url) {
  let siteUrl = sitemeta.url.replace(/\/$/, '');
  if (!siteUrl.startsWith('http://') || !siteUrl.startsWith('https://')) {
    siteUrl = 'https://' + siteUrl;
  }
  const relUrl = url.replace(/^\//, '');
  return `${siteUrl}/${relUrl}`;
};

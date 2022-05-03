const sanitize = require('../helpers/sanitizeHtmlAttr');
const sitemeta = require('../../src/_data/sitemeta.json');

const generateTag = (prop, value) => {
  const tags = {
    'og:title': `property="og:title" content="${value}"`,
    'og:url': `property="og:url" content="${value}"`,
    'og:type': `property="og:type" content="${value}"`,
    'og:description': `property="og:description" content="${value}"`,
    'og:site_name': `property="og:site_name" content="${value}"`,
    'twitter:title': `name="twitter:title" content="${value}"`,
    'twitter:creator': `name="twitter:creator" content="${value}"`,
    'twitter:description': `name="twitter:description" content="${value}"`,
    'twitter:card': `name="twitter:card" content="${value}"`,
  };
  return `<meta ${tags[prop]} />`;
};

module.exports = function (title, url, description = sitemeta.description, type = 'website') {
  if (title === undefined) throw new Error("OG Meta title can't be undefined");
  if (url === undefined) throw new Error("OG Meta url can't be undefined");
  if (description === undefined) throw new Error("OG Meta description can't be undefined");

  const elems = [];

  const tags = [
    ['og:title', sanitize(title)],
    ['og:url', url],
    ['og:type', type],
    ['og:description', sanitize(description)],
    ['og:site_name', sitemeta.title],
    ['twitter:title', sanitize(title)],
    ['twitter:description', sanitize(description)],
    ['twitter:card', 'summary_large_card'],
  ];

  tags.forEach((tag) => {
    elems.push(generateTag(tag[0], tag[1]));
  });

  if (sitemeta.twitter) elems.push(generateTag('twitter:creator', sitemeta.twitter));

  return elems.join('\n');
};

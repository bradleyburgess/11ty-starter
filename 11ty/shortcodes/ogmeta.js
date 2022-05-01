const sanitize = require('../helpers/sanitizeHtmlAttr');
const sitemeta = require('../../src/_data/sitemeta.json');

module.exports = function (title, url, description = sitemeta.description, type = 'website') {
  return `<meta property="og:title" content="${sanitize(title)}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${type}" />
<meta property="og:description" content="${sanitize(description)}" />
${sitemeta.title && `<meta property="og:site_name" content="${sanitize(sitemeta.title)}" />`}
<meta name="twitter:title" content="${sanitize(title)}" />
${sitemeta.twitter && `<meta name="twitter:creator" content="${sitemeta.twitter}" />`}
<meta name="twitter:description" content="${sanitize(description)}" />
<meta name="twitter:card" content="summary_large_image" />
`;
};

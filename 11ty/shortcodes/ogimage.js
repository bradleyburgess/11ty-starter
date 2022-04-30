const path = require('path');
const Image = require('@11ty/eleventy-img');
const dir = require('../constants/dir');
const sanitize = require('../helpers/sanitizeHtmlAttr');
const settings = require('../constants/settings');
const checkRemoteSrc = require('../helpers/checkRemoteSrc');
const toAbsoluteUrl = require('../filters/toAbsoluteUrl');

const widths = [settings.ogImage.width];
const format = settings.ogImage.format;

module.exports = async function (src, alt) {
  if (alt === undefined) {
    console.error(`\x1b[31mMissing alt for ${src} in ${this.page.inputPath}`);
    process.exit(1);
  }

  const isRemoteSrc = checkRemoteSrc(src);

  const imgDir = '/img';
  const fullyQualifiedSrc = isRemoteSrc
    ? src
    : path.join(dir.input, 'img', path.parse(src).dir, path.parse(src).base);
  const outputDir = path.join(dir.output, 'img');

  console.log(`Transforming OG image: ${src} in${this.page.inputPath}`);

  const metadata = await Image(fullyQualifiedSrc, {
    widths,
    formats: [format],
    outputDir,
    urlPath: imgDir,
  });

  const { url, width, height } = metadata[format][0];

  return `<meta property="og:image" content="${toAbsoluteUrl(url)}" />
<meta property="og:image:alt" content="${sanitize(alt)}" />
<meta property="og:image:width" content="${width}" />
<meta property="og:image:height" content="${height}" />
<meta property="og:image:type" content="image/${format}" />
<meta name="twitter:image" content="${toAbsoluteUrl(url)}" />
<meta name="twitter:image:alt" content="${sanitize(alt)}" />
`;
};

const path = require('path');
const Image = require('@11ty/eleventy-img');
const dir = require('../constants/dir');
const sanitizeAltText = require('../helpers/sanitizeHtmlAttr');
const checkRemoteSrc = require('../helpers/checkRemoteSrc');

const defaults = {
  formats: ['webp', 'avif', 'jpg'],
  loading: 'lazy',
  sizes: ['100vw'],
  widths: [600, 900, 1200, 1800, 2400, 4200, null],
};

module.exports = async function (src, alt, _options) {
  const options = { ...defaults, ...(_options ?? {}) };
  const { widths, formats, loading, sizes } = options;

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

  console.log(`Transforming image: ${src} in${this.page.inputPath}`);

  const metadata = await Image(fullyQualifiedSrc, {
    widths,
    formats,
    outputDir,
    urlPath: imgDir,
  });

  const imageAttributes = {
    alt: sanitizeAltText(alt),
    sizes,
    loading,
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};

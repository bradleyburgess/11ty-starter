require('dotenv').config();
const dir = require('./11ty/constants/dir');

const brokenLinks = require('eleventy-plugin-broken-links');
const faviconPlugin = require('eleventy-plugin-gen-favicons');
const htmlminTransform = require('./11ty/transforms/htmlmin');
const imageShortcode = require('./11ty/shortcodes/image');
const markdownShortcode = require('./11ty/shortcodes/markdown');
const ogImageShortcode = require('./11ty/shortcodes/ogimage');
const ogMetaShortcode = require('./11ty/shortcodes/ogmeta');
const prettierTransform = require('./11ty/transforms/prettier');
const sanitizeHtmlAttr = require('./11ty/helpers/sanitizeHtmlAttr');
const toAbsoluteUrlFilter = require('./11ty/filters/toAbsoluteUrl');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./11ty');

  // filters
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrlFilter);
  eleventyConfig.addFilter('sanitizeHtmlAttr', sanitizeHtmlAttr);

  // shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode('ogimage', ogImageShortcode);
  eleventyConfig.addNunjucksShortcode('ogmeta', ogMetaShortcode);
  eleventyConfig.addPairedNunjucksShortcode('markdown', markdownShortcode);

  // plugins
  eleventyConfig.addPlugin(brokenLinks);
  eleventyConfig.addPlugin(faviconPlugin, {
    outputDir: dir.output,
    generateManifest: false,
  });

  // transforms, for prettifying and minifying
  eleventyConfig.addTransform('prettier', prettierTransform);
  eleventyConfig.addTransform('htmlmin', htmlminTransform);

  return {
    dir,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

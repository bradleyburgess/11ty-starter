const dir = require('./11ty/constants/dir');
const htmlminTransform = require('./11ty/transforms/htmlmin');

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform('htmlmin', htmlminTransform);
  return {
    dir,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

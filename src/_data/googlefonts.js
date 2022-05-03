const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async () => {
  const url =
    'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@300;400;500;600;700&display=swap';

  const css = await EleventyFetch(url, {
    duration: '1d',
    type: 'text',
  });
  return css;
};

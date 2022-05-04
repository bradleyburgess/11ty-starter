const EleventyFetch = require('@11ty/eleventy-fetch');

const fonts = [
  'Noto+Serif:ital,wght@0,400;0,700;1,400;1,700',
  'Open+Sans:wght@300;400;500;600;700',
];

const fontString =
  'https://fonts.googleapis.com/css2?' +
  fonts.map((font) => 'family=' + font).join('&') +
  '&display=swap';

module.exports = async () => {
  const url = fontString;

  try {
    const css = await EleventyFetch(url, {
      duration: '1d',
      type: 'text',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      },
    });
    return css;
  } catch (error) {
    console.log('Failed to get Google Fonts');
    throw new Error(error);
  }
};

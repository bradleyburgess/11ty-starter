/*
  |--------------------------------------------------------------------------
  | Browser-sync config file
  |--------------------------------------------------------------------------
  |
  | For up-to-date information about the options:
  |   http://www.browsersync.io/docs/options/
  |
  | There are more options than you see here, these are just the ones that are
  | set internally. See the website for more info.
  |
  |
 */

const fs = require('fs');
const dir = require('./11ty/constants/dir');
const path = require('path');

// create temporary 404 page if it doesn't exist yet
if (!fs.existsSync(path.join(__dirname, dir.output, '404.html'))) {
  if (!fs.existsSync(path.join(__dirname, dir.output))) {
    fs.mkdirSync(path.join(__dirname, dir.output));
  }
  fs.writeFileSync(path.join(__dirname, dir.output, '404.html'), '404 not found');
}

const notFoundPage = fs.readFileSync(path.join(__dirname, 'dist', '404.html'));

module.exports = {
  files: ['dist/*'],
  injectChanges: true,
  open: false,
  server: 'dist',
  throttle: 3000,
  callbacks: {
    ready: function (err, bs) {
      bs.addMiddleware('*', (req, res) => {
        res.writeHead(404);
        res.write(notFoundPage);
        res.end();
      });
    },
  },
};

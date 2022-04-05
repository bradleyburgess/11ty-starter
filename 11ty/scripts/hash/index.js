const hash = require('./hash');
const unhash = require('./unhash');

if (process.env.NODE_ENV === 'production') {
  hash();
} else {
  unhash();
}

const log = console.log;
const fs = require('fs');

setInterval(() => {
  fs.unlink('./fdaffdsa.js', err => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
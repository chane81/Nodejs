const fs = require('fs');
const log = console.log;

fs.copyFile('./files/readme.txt', './files/copyReadme.txt', err => {
  if (err) {
    return console.error(err);
  }

  log('복사 완료');
});
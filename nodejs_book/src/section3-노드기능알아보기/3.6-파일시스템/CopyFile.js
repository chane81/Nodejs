const log = console.log;
const fs = require('fs');


fs.copyFile('./files/readme.txt', './files/copyReadme.txt', err => {
  if (err) {
    return console.error(err);
  }

  log('복사 완료');
});
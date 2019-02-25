const log = console.log;
const fs = require('fs');


log('시작');

fs.readFile('./files/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }

  log('1번', data.toString());
});

fs.readFile('./files/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }

  log('2번', data.toString());
});

fs.readFile('./files/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }

  log('3번', data.toString());
});

log('끝');
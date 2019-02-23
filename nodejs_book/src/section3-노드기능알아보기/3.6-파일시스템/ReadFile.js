const log = console.log;
const fs = require('fs');


fs.readFile('./files/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }

  log(data);
  log(data.toString());
});
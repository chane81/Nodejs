const log = console.log;
const fs = require('fs');


fs.appendFile('./files/write.txt', '\n글 append 하기!', err => {
  if (err) {
    throw err;
  }

  fs.readFile('./files/write.txt', (err, data) => {
    if (err) {
      throw err;
    }

    log(data.toString());
  });
});

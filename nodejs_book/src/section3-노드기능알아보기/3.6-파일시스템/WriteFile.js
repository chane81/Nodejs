const log = console.log;
const fs = require('fs');


fs.writeFile('./files/writeme.txt', '글이 입력됩니다.', err => {
  if (err) {
    throw err;
  }

  fs.readFile('./files/writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }

    log(data.toString());
  });
});
const log = console.log;
const fs = require('fs');


fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, err => {
  if (err) {
    if (err.code === 'ENOENT') {
      log('폴더 없음');

      fs.mkdir('./folder', err => {
        if (err) {
          throw err;
        }

        log('폴더 만들기 성공');

        fs.open('./folder/file.js', 'w', (err, fd) => {
          if (err) {
            throw err;
          }

          log('빈 파일 만들기 성공', fd);

          fs.rename('./folder/file.js', './folder/newFile.js', err => {
            if (err) {
              throw err;
            }

            log('이름 바꾸기 성공');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    log('이미 폴더 있음');
  }
});
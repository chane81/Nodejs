const log = console.log;
const fs = require('fs');


fs.readdir('./files', (err, dir) => {
  if (err) {
    throw err;
  }

  log('폴더 내용 확인', dir);

  fs.unlink('./files/copyReadme.txt', err => {
    if (err) {
      throw err;
    }

    log('파일 삭제 성공');

    fs.rmdir('./delFolder', err => {
      if (err) {
        throw err;
      }

      log('폴더 삭제 성공');
    })
  })
})
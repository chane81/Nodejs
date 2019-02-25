const log = console.log;
const fs = require('fs');


// 해당 파일에 스트림 write 하기 위한 인스턴스 생성
const writeStream = fs.createWriteStream('./files/write.txt');

// 스트림 write finish 이벤트 핸들러
writeStream.on('finish', () => {
  log('파일 쓰기 완료');
});

// 스트림 write
writeStream.write('이 글을 쏩니다\n');
writeStream.write('한번 더 쏩니다.');


// 스트림 write end
writeStream.end();
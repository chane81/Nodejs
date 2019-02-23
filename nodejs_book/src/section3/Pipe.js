const fs = require('fs');
const log = console.log;

// stream read
const readStream = fs.createReadStream('./files/readme.txt');

// write stream 인스턴스 생성
const writeStream = fs.createWriteStream('./files/cloneReadMe.txt');

// read stream 과 write stream 을 pipe 로 연결하여 파일 복사
readStream.pipe(writeStream);
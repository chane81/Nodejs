const fs = require('fs');
const log = console.log;

// 버퍼 read, highWaterMark(버퍼 크기) - 16byte 로 나눔, 기본값은 64kb
const readStream = fs.createReadStream('./files/readme.txt', { highWaterMark: 16 });
const data = [];

// 버퍼크기만큼 array 에 push
readStream.on('data', chunk => {
  data.push(chunk);
  log(`data: ${chunk.toString('hex')} | ${chunk.length}`);
});

// 버퍼 read end
readStream.on('end', () => {
  log(`end: ${Buffer.concat(data).toString()}`);
});

// 버퍼 read error
readStream.on('error', err => {
  log(`error: ${err}`);
});
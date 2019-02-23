const zlib = require('zlib');
const fs = require('fs');
const log = console.log;


// read stream
const readStream = fs.createReadStream('./files/readme.txt');

// gzip 인스턴스 생성
const zlibStream = zlib.createGzip();

// write stream 생성
const writeStream = fs.createWriteStream('./files/gzipReadme.txt.gz');

// pipe 하여 gzip 으로 된 파일 생성
readStream.pipe(zlibStream).pipe(writeStream);
const log = console.log;
const fs = require('fs');


log('시작');

let data = fs.readFileSync('./files/readme.txt');
log('1번', data.toString());

data = fs.readFileSync('./files/readme.txt');
log('2번', data.toString());

data = fs.readFileSync('./files/readme.txt');
log('3번', data.toString());

log('끝');
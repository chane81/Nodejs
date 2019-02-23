const log = console.log;
const { Buffer } = require('buffer');


// 버퍼 길이, toString
const buffer1 = Buffer.from('저를 버퍼로 바꿔보세요');
log(`from(): ${buffer1}`);
log(`length: ${buffer1.length}`);
log(`toString(): ${buffer1.toString()} `);

// 버퍼 array 합치기
const arrayObj = [Buffer.from('뛰엄 '), Buffer.from('뛰엄 '), Buffer.from('띄어쓰기 ')];
const buffer2 = Buffer.concat(arrayObj);
log(`concat(): ${buffer2.toString()}`);

// 해당 바이트수 만큼의 빈 버퍼 생성
const buffer3 = Buffer.alloc(5);
buffer3.write('abcdefg');
log(`alloc(): ${buffer3.toString()}`);
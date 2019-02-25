const log = console.log;

// 예기치 못한 에러 발생시 이벤트 리스너
// 만약 아래 uncaughtException 처리부분이 없으면 에러 발생시 바로 프로세스 종료됨
// process.on('uncaughtException', err => {
//   console.error('예기치 못한 에러', err);
// });

// 1초마다 발생하는 로직, 에러가 발생하여 uncaughtException 으로 빠짐
setInterval(() => {
  throw new Error('서버 고장내기!');
}, 1000);

// 에러발생하여 프로세스가 종료되지 않고 아래 로직이 실행됨
// 만약 process.on('uncaughtException' << 이부분이 없다면 프로세스는 그냥 종료됨
setTimeout(() => {
  log('실행됩니다.');
}, 2000);
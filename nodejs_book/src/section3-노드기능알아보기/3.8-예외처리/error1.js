const log = console.log;

setInterval(() => {
  log('시작');

  try {
    throw new Error('서버를 고장내기!');
  } catch (err) {
    console.error(err);
  }
}, 1000);
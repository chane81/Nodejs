const log = console.log;
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  log('이벤트 1');
});
myEvent.addListener('event2', () => {
  log('이벤트 2');
});
myEvent.addListener('event2', () => {
  log('이벤트 2 추가');
});

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', () => {
  log('이벤트 3');
});
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
  log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
  log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

log(myEvent.listenerCount('event2'));

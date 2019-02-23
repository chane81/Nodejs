const log = console.log;
const os = require('os');


log('운영체제 정보---------------------------------');
log(`os.arch(): ${os.arch()}`);
log(`os.platform(): ${os.platform()}`);
log(`os.type(): ${os.type()}`);
log(`os.uptime(): ${os.uptime()}`);
log(`os.hostname(): ${os.hostname()}`);
log(`os.release(): ${os.release()}`);
log(`os.release(): ${os.release()}`);

log('경로---------------------------------');
log(`os.homedir(): ${os.homedir()}`);
log(`os.tmpdir(): ${os.tmpdir()}`);

log('cpu 정보---------------------------------');
log(`os.cpus(): ${os.cpus()}`);
log(`os.cpus().length: ${os.cpus().length}`);

log('메모리 정보---------------------------------');
log(`os.freemem(): ${os.freemem()}`);
log(`os.totalmem(): ${os.totalmem()}`);
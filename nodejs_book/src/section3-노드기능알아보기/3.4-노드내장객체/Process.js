const log = console.log;
require('dotenv').config();


log('시스템 process env 출력 ------------------------------------');
log(process.env);

log('\n사용자정의 env 출력 ----------------------------------------');
log(`SECRET_ID: ${process.env.SECRET_ID}`);
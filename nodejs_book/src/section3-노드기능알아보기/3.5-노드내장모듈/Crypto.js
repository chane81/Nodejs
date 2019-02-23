const log = console.log;
const crypto = require('crypto');

// 단방향 암호화
log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
log('base64:', crypto.createHash('sha512').update('다른비밀번호').digest('base64'));

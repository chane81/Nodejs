const log = console.log;
const { URL } = require('url');


const myUrl = new URL('https://shopping.naver.com/art/event/28300');
log('new URL():', myUrl);
log(`url.format(): ${url.format(myUrl)}`);
log('--------------------------------------------------');
const parsedUrl = url.parse('https://shopping.naver.com/art/event/28300');
log('url.parse():', parsedUrl);
log(`url.format(): ${url.format(parsedUrl)}`);
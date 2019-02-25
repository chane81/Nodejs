const log = console.log;
const url = require('url');
const querystring = require('querystring');

const parseUrl = url.parse('https://shopping.naver.com/?page=3&limit=10&category=nodejs&category=javascript');
const query =  querystring.parse(parseUrl.query);
log('querystring.parse():', query);
log('querystring.stringify():', querystring.stringify(query));
const log = console.log;
const { URL } = require('url');


const myUrl = new URL('https://shopping.naver.com/art/event/?page=3&limit=10&category=nodejs&category=javascript');
log('searchParams:', myUrl.searchParams);
log('searchParams.getAll():', myUrl.searchParams.getAll('category'));
log('searchParams.get():', myUrl.searchParams.get('limit'));
log('searchParams.has():', myUrl.searchParams.has('page'));

log('searchParams.keys():', myUrl.searchParams.keys());
log('searchParams.values():', myUrl.searchParams.values());

myUrl.searchParams.append('filter', 'es3');
myUrl.searchParams.append('filter', 'es5');
log(myUrl.searchParams.getAll('filter'));

myUrl.searchParams.set('filter', 'es6');
log(myUrl.searchParams.getAll('filter'));

myUrl.searchParams.delete('filter');
log(myUrl.searchParams.getAll('filter'));

log('searchParams.toString():', myUrl.searchParams.toString());
myUrl.search = myUrl.searchParams.toString();
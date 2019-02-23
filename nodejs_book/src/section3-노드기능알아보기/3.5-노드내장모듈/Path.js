const log = console.log;
const path = require('path');
const fileName = __filename;

log(`path.sep: ${path.sep}`);
log(`path.delimiter: ${path.delimiter}`);
log('--------------------------------------------------');
log(`path.dirname(): ${path.dirname(fileName)}`);
log(`path.extname(): ${path.extname(fileName)}`);
log(`path.basename(): ${path.basename(fileName)}`);
log(`path.basename(): ${path.basename(fileName, path.extname(fileName))}`);
log('--------------------------------------------------');
log('path.parse():', path.parse(fileName));
log(`path.format(): ${path.format({
  dir: 'C:\\users\\test',
  name: 'path',
  ext: '.js'
})}`);
log(`path.normalize(): ${path.normalize('c://Users\\\\chane\\\.babel.json')}`);
log('--------------------------------------------------');
log('path.isAbsolute():', path.isAbsolute('c:\\'));
log('path.isAbsolute():', path.isAbsolute('./home'));
log('--------------------------------------------------');
log('path.relative():', path.relative('c:\\users\chane\\.gitconfig', 'c:\\'));
log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/chane'));
log('path.resolve():', path.resolve(__dirname, '..', '/users', '.', '/chane'));
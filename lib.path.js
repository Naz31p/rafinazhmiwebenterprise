import path from 'path';

const filePath = '/home/rafi/Documents/NodeJS/lib/path.js';
console.info(path.sep);
console.info(path.dirname(filePath));
console.info(path.basename(filePath));
console.info(path.extname(filePath));
console.info(path.parse(filePath));
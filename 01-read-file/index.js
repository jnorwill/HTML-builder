const { stdout } = process
const fs = require('fs');
const path = require('path');
const pathToText = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathToText, 'utf-8');
let data = '';
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => stdout.write(data));
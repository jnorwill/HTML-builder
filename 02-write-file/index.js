const { stdout, stdin } = process
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Здравствуйте, введите пожалуйста текст: ')
process.on('exit', () => stdout.write('До свидания!'));
process.on('SIGINT', () => process.exit());
stdin.on('data', (data) => {
    console.log('тест', data.toString() === 'exit')
    if (data.toString().replace(/\W/gi, '') === 'exit') {
        process.exit();
    }
    output.write(data.toString())
})
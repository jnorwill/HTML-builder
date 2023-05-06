const path = require('path')
const fs = require('fs')
const callback = (err) => {
    if (err) console.log(err)
}

const pathToStyles = path.join(__dirname, 'styles')
const pathToStylesBundle = path.join(__dirname, 'project-dist', 'bundle.css')



fs.unlink(pathToStylesBundle, () => {
    fs.writeFile(pathToStylesBundle, '', callback)
    fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
        callback(err)
        let data = '';
        files.forEach((file) => {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const readStream = fs.createReadStream(path.join(pathToStyles, file.name), 'utf-8');
                const writeStream = fs.createWriteStream(pathToStylesBundle);
                readStream.on('data', chunk => data += chunk);
                readStream.on('end', () => writeStream.write(data));
            }
        })
    })
})

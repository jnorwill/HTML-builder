const path = require('path')
const fs = require('fs')
const callback = (err) => {
    if (err) console.log(err)
}

const pathToComponents = path.join(__dirname, 'components')
const pathToTemplate = path.join(__dirname, 'template.html')
const pathToDist = path.join(__dirname, 'project-dist')
const pathToDistHtml = path.join(__dirname, 'project-dist', 'index.html')
const pathToStyles = path.join(__dirname, 'styles')
const pathToDistCss = path.join(__dirname, 'project-dist', 'style.css')
const pathToAssets = path.join(__dirname, 'assets')
const pathToDistAssets = path.join(__dirname, 'project-dist', 'assets')

fs.rm(pathToDist, { recursive: true, force: true }, (err) => {
    callback(err)
    fs.mkdir(pathToDist, callback)

    fs.unlink(pathToDistHtml, () => {
        fs.writeFile(pathToDistHtml, '', callback)
        fs.readdir(pathToComponents, { withFileTypes: true }, (err, files) => {
            callback(err)

            let wholeHtml = '';
            files.forEach((file, index) => {
                if (file.isFile() && path.extname(file.name) === '.html') {
                    const readStream = fs.createReadStream(path.join(pathToComponents, file.name), 'utf-8');
                    const writeStream = fs.createWriteStream(pathToDistHtml);
                    fs.readFile(pathToTemplate, 'utf8', (err, data) => {
                        callback(err)
                        if (index === 0) {
                            wholeHtml = data
                        }
                        if (wholeHtml.includes(`{{${path.parse(file.name).name}}}`)) {
                            readStream.on('data', chunk => {
                                wholeHtml = wholeHtml.replace(`{{${path.parse(file.name).name}}}`, chunk)
                            });
                            readStream.on('end', () => {
                                writeStream.write(wholeHtml)
                                // console.log(index, `Текст {{${path.parse(file.name).name}}} найден.`);
                            });
                        } else {
                            // console.log(`Текст {{${path.parse(file.name).name}}} не найден.`);
                        }
                    })
                }
            })
        })
    })

    fs.unlink(pathToDistCss, () => {
        fs.writeFile(pathToDistCss, '', callback)
        fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
            callback(err)
            let data = '';
            files.forEach((file) => {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    const readStream = fs.createReadStream(path.join(pathToStyles, file.name), 'utf-8');
                    const writeStream = fs.createWriteStream(pathToDistCss);
                    readStream.on('data', chunk => data += chunk);
                    readStream.on('end', () => writeStream.write(data));
                }
            })
        })
    })


    function moveAssest(sourcePath, newPath) {
        fs.rm(newPath, { recursive: true, force: true }, (err) => {
            callback(err)
            fs.mkdir(newPath, callback)
            fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
                callback(err)
                files.forEach(file => {
                    const sourceFile = path.join(sourcePath, file.name);
                    const newFile = path.join(newPath, file.name);
                    fs.stat(sourceFile, (err, stats) => {
                        callback(err)
                        if (stats.isDirectory()) {
                            moveAssest(sourceFile, newFile);
                        } else {
                            fs.copyFile(sourceFile, newFile, callback)
                        }
                    })
                });
            })
        })

    }
    moveAssest(pathToAssets, pathToDistAssets);
})
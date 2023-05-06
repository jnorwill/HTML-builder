const path = require('path');
const fs = require('fs');
const { stdout } = process
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err)
    else {
        files.forEach((file) => {
            if (file.isFile()) {
                let fileName
                let fileExtname
                let fileSize
                fileName = file.name
                fileExtname = path.extname(file.name)
                fs.stat(path.join(__dirname, 'secret-folder', fileName), (err, stats) => {
                    if (err)
                        console.log(err)
                    else {
                        fileSize = stats.size
                        stdout.write(file.name.replace(/\.\w+$/, '') + ' - ' + fileExtname + ' - ' + fileSize)
                    }
                })
            }
        })
    }
})

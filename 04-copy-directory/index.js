

const path = require('path');
const fs = require('fs');
const callback = (err) => {
    if (err) console.log(err);
}
const pathToFolderCopy = path.join(__dirname, 'files-copy')
const pathToFolder = path.join(__dirname, 'files')

fs.rm(pathToFolderCopy, { recursive: true, force: true }, (err) => {
    callback(err)
    fs.mkdir(pathToFolderCopy, callback)
    fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
        callback(err)
        files.forEach((file) => {
            fs.copyFile(path.join(pathToFolder, file.name), (path.join(pathToFolderCopy, file.name)), callback)
        })
    })
})
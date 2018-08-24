const fs = require('fs');

function openFile(value) {
    return new Promise((resolve) => {
        const { path } = value;
        fs.readFile(path, (err, fd) => {
            if(err) { throw err; }

            resolve(fd);
        })
    });
}

module.exports = openFile;
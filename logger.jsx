const fs = require('fs');

export function logger(text) {
    const filename = 'log.txt';
    const dataToAppend = text + '\n'; 
    fs.appendFile(filename, dataToAppend, (err) => {
        if (err) {
            console.error('Error appending to log file:', err);
        } 
    });
}

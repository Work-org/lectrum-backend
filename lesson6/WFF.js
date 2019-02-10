const path = require('path');
const fs = require('fs');

class WatchForFolder {
    constructor(options) {
        this.options = Object.assign({}, {
            folder: path.dirname(__filename)
        }, options);
    }
    
    watch(folder = null) {
        fs.watch(folder || this.options.folder, {}, (eventType, filename) => {
              console.log('watch -->', eventType, filename);
          })
          .on('change', (eventType, filename) => {
              console.log('change -->', eventType, filename);
          })
    }
}

module.exports = WatchForFolder;
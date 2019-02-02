const Readable = require('stream').Readable;

class Ui extends Readable {
    constructor(data, options = {}) {
        super(options);
        this.data = data;
        this.init();
    }
    
    init() {
        /*this.on('data', (chunk) => {
            console.log('--> chunk ', chunk);
        });*/
    }
    
    _read() {
        let data = this.data.shift();
        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }
}

module.exports = Ui;
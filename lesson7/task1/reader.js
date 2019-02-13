const Readable = require('stream').Readable;

class Reader extends Readable {
    constructor(options = {}, data) {
        super(options);
        this.data = data;
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

module.exports = Reader;
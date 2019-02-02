const Transform = require('stream').Transform;

class Decryptor extends Transform {
    constructor(props = {}) {
        super(props);
    }
    
    _transform(chunk, encoding, done) {
        const {meta, payload} = chunk;
        this.push({
            name    : payload.name,
            email   : Decryptor._decrypt(payload.email, meta.algorithm),
            password: Decryptor._decrypt(payload.password, meta.algorithm)
        });
        
        done();
    }
    
    static _decrypt(field, algorithm) {
        return Buffer.from(field, algorithm).toString('utf8')
    }
}

module.exports = Decryptor;
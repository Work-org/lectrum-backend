const Transform = require('stream').Transform;

class Guardian extends Transform {
    constructor(props = {}) {
        super(props);
    }
    
    _transform(chunk, encoding, done) {
        this.push({
            meta   : {
                source: 'ui'
            },
            payload: {
                name    : chunk.name,
                email   : Buffer.from(chunk.email, 'utf8').toString('hex'),
                password: Buffer.from(chunk.password, 'utf8').toString('hex')
            }
        });
        
        done();
    }
}

module.exports = Guardian;
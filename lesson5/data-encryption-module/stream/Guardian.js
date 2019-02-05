const Transform = require('stream').Transform;
const Pass      = require('../pass');

class Guardian extends Transform {
    constructor(props = {}, credentials) {
        super(props);
        this.crypto = new Pass(...credentials);
    }
    
    async _transform(chunk, encoding, done) {
        this.push({
            meta:    {
                source: 'ui'
            },
            payload: {
                name:     chunk.name,
                email:    await this.crypto.encrypt(chunk.email),
                password: await this.crypto.encrypt(chunk.password)
            }
        });
        
        done();
    }
}

module.exports = Guardian;
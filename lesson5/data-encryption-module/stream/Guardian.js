const Transform = require('stream').Transform;
const Pass = require('../pass');

class Guardian extends Transform {
    constructor(props = {}, credentials = {}) {
        super(props);
        this.passer = new Pass(credentials);
    }
    
    async _transform(chunk, encoding, done) {
        const payload = {
            name:     chunk.name,
            email:    await this.passer.encrypt(chunk.email),
            password: await this.passer.encrypt(chunk.password)
        };
        
        this.push({
                      meta: {
                          source:    'ui',
                          signature: this.passer.sign(payload)
                      },
                      payload
                  });
        
        done();
    }
}

module.exports = Guardian;
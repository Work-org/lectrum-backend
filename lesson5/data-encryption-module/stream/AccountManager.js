const Writable = require('stream').Writable;
const Pass = require('../pass');

class AccountManager extends Writable {
    constructor(options = {}, credentials = {}) {
        super(options);
        this.passer = new Pass(credentials);
    }
    
    async _write(chunk, encoding, done) {
        const { payload, meta } = chunk;
        let customer = {
            name:     payload.name,
            email:    await this.passer.decrypt(payload.email),
            password: await this.passer.decrypt(payload.password)
        };
        
        if (this.passer.verify(payload, meta.signature)) {
            console.log('write from source -->', customer);
        } else {
            console.error('Data not passed digitally verified');
        }
        
        done();
    }
}

module.exports = AccountManager;
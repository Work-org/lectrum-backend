const Writable = require('stream').Writable;
const Pass      = require('../pass');

class AccountManager extends Writable {
    constructor(options = {}, credentials) {
        super(options);
        this.crypto = new Pass(...credentials);
    }
    
    async _write(chunk, encoding, done) {
        const {payload} = chunk;
        let customer = {
            name    : payload.name,
            email   : await this.crypto.decrypt(payload.email),
            password: await this.crypto.decrypt(payload.password)
        };
        
        console.log('write from source -->', customer);
        done();
    }
}

module.exports = AccountManager;
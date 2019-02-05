const {Sign, Verify, createCipheriv, createDecipheriv, randomFill, scrypt} = require('crypto');

class Pass {
    constructor(algorithm, password, sing) {
        this.algorithm = algorithm;
        this.password = password;
        this.beSign = sing;
        // @todo 1 get key from certificate
        // sign result
        // verify result
    }
    
    async encrypt(data) {
        const {key, vector} = await this._getOptions();
        const cipher = createCipheriv(this.algorithm, key, vector);
        
        return cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex');
    }
    
    async decrypt(encrypted) {
        const {key, vector} = await this._getOptions();
        const decipher = createDecipheriv(this.algorithm, key, vector);
        
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }
    
    async _getOptions() {
        const key = await this._getKey(this.password).catch(err => console.log(err));
        const vector = await this._getBuffer().catch(err => console.log(err));
        
        return {key, vector}
    }
    
    _getKey(password) {
        const salt = 'homework';
        
        return new Promise((resolve, reject) => {
            scrypt(password, salt, 24, (err, derivedKey) => {
                if (err) {
                    reject(err);
                }
                resolve(derivedKey);
            });
        });
    }
    
    _getBuffer() {
        const size = 16;
        
        return new Promise((resolve, reject) => {
            randomFill(Buffer.alloc(size, 0), size, (err, buffer) => {
                if (err) {
                    reject(err);
                }
                resolve(buffer);
            });
        });
    }
}

module.exports = Pass;
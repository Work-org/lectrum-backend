const crypto = require('crypto');

class Pass {
    constructor(algorithm, password) {
        this.algorithm = algorithm;
        this.password  = password;
    }
    
    async encrypt(data) {
        const { key, vector } = await this._getOptions();
        const cipher          = crypto.createCipheriv(this.algorithm, key, vector);
        let encrypted         = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return encrypted;
    }
    
    async decrypt(encrypted) {
        const { key, vector } = await this._getOptions();
        const decipher        = crypto.createDecipheriv(this.algorithm, key, vector);
        let decrypted         = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
    
    async _getOptions() {
        const key    = await this._getKey(this.password).catch(err => console.log(err));
        const vector = await this._getBuffer().catch(err => console.log(err));
        
        return { key, vector }
    }
    
    _getKey(password) {
        const salt = 'homework';
        
        return new Promise((resolve, reject) => {
            crypto.scrypt(password, salt, 24, (err, derivedKey) => {
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
            crypto.randomFill(Buffer.alloc(size, 0), size, (err, buffer) => {
                if (err) {
                    reject(err);
                }
                resolve(buffer);
            });
        });
    }
}

module.exports = Pass;
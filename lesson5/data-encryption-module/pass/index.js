const { createCipheriv, createDecipheriv, scrypt, randomFill, Certificate, Sign, Verify } = require('crypto');
const fs = require('fs');

class Pass {
    constructor({ algorithm, password, pathKey, spkac } = {
        algorithm: 'base64', password: '', pathKey: null, spkac: null
    }) {
        this.algorithm = algorithm;
        this.password = password;
        this.pathKey = pathKey;
        this.spkac = spkac;
        this.privateKey = '';
        this.init();
    }
    
    init() {
        try {
            this._signCheck();
            
            function readKey(keyName, err, data) {
                if (err) {
                    throw err;
                }
                
                this[keyName] = data;
            }
            
            fs.readFile(this.pathKey, readKey.bind(this, 'privateKey'));
            fs.readFile(this.spkac, readKey.bind(this, 'spkac'));
        } catch (err) {
            console.warn(
                'Encryption works without digital signature. If you want to secure data, we recommend using a digital certificate.');
        }
    }
    
    sign(data) {
        this._signCheck();
        const signer = new Sign('RSA-SHA256');
        signer.update(JSON.stringify(data));
        signer.end();
        
        return signer.sign(this.privateKey, 'hex');
    }
    
    verify(data, signature) {
        this._signCheck();
        const verify = new Verify('RSA-SHA256');
        verify.update(JSON.stringify(data));
        verify.end();
        const spkac = this.spkac.toString().replace(/^SPKAC=/i, '');
        const publicKey = Certificate.exportPublicKey(spkac);
        
        return verify.verify(publicKey, signature, 'hex');
    }
    
    async encrypt(data) {
        const { key, vector } = await this._getOptions();
        const cipher = createCipheriv(this.algorithm, key, vector);
        
        return cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex');
    }
    
    async decrypt(encrypted) {
        const { key, vector } = await this._getOptions();
        const decipher = createDecipheriv(this.algorithm, key, vector);
        
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }
    
    async _getOptions() {
        const key = await this._getKey(this.password).catch(err => console.log(err));
        const vector = await this._getBuffer().catch(err => console.log(err));
        
        return { key, vector }
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
    
    _signCheck() {
        if (!this.pathKey || !this.spkac) {
            throw new Error('Signature not configured');
        }
    }
}

module.exports = Pass;
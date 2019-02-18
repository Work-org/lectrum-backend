// Core
const { gzip, gunzip } = require('zlib');
const fs = require('fs');
const { normalize, dirname, basename, resolve } = require('path');

// Instruments
class Archiver {
    static get ext() {return '.gz'};
    
    constructor(options = {}) {
        this.options = Object.assign({}, {
            out: normalize(dirname(__filename) + `/../data/file[${Archiver.name}].dest`)
        }, options);
    }
    
    create(data, done = function () {}) {
        this
            ._transform(gzip, data)
            .then(archive => {
                this._write(archive, done);
            })
            .catch(err => console.log('error create archive -->', err.message));
    }
    
    extract(data, done = function () {}) {
        this
            ._transform(gunzip, data)
            .then(extracted => {
                this.options.out = resolve(dirname(this.options.out), basename(this.options.out, '.gz'));
                this._write(extracted, done);
            })
            .catch(err => console.log('error extract -->', err.message));
    }
    
    _transform(transform, data) {
        return new Promise((resolve, reject) => {
            transform(data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    _write(data, done) {
        if (data) {
            const out = fs.createWriteStream(this.options.out);
            out.on('error', err => console.log('ERROR writer -->', err.message));
            out.write(data, null, done);
            out.end();
        }
    }
}

module.exports = Archiver;
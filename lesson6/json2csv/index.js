const fs = require('fs');
const Archiver = require('./Archiver');
const { dirname, normalize, basename, join } = require('path');

class formatConverter {
    constructor({ csv = null }) {
        this.resource = normalize(dirname(__filename) + `/../data`);
        this.default = {
            csv: {
                delimiter:    ',',
                escape:       '\n',
                quote:        '',
                hasFirstLine: true,
                fields:       [],
                lines:        null,
                destination:  'inherit',
                ext:          'csv',
                pack:         false
            },
            // json: {}
        };
        this.optionsCSV = Object.assign({}, this.default.csv, csv !== null ? csv : {});
        this._reducer = this._reducer.bind(this);
        this._lookFor = this._lookFor.bind(this);
        this._quoted = this._quoted.bind(this);
        this._cuted = this._cuted.bind(this);
    }
    
    convert(resource, cb = function () {}) {
        this.resource = resource;
        fs.readFile(resource, 'utf-8', (err, data) => {
            if (err) throw err;
            
            // expose magic
            data = data.replace(/\\n\\t\\x/ig,  ' ');
            const jsonData = JSON.parse(data);
            try {
                const { delimiter, escape, hasFirstLine } = this.optionsCSV;
                
                const firstLine = hasFirstLine ? this._firstLine(jsonData, delimiter, escape) : '';
                const retrieved = jsonData
                    .map(this._lookFor)
                    .reduce(this._reducer, firstLine);
                this._destination(retrieved);
                
                cb(null, retrieved);
            } catch (error) {
                cb(error);
            }
        });
    }
    
    changeDestination(destination) {
        return this.optionsCSV.destination = destination;
    }
    
    _lookFor(object) {
        const fields = this.optionsCSV.fields;
        let lockFor = object;
        if (fields.length > 0) {
            lockFor = this._cuted(object);
        }
        
        return Object
            .values(lockFor)
            .map(this._quoted)
            .join(this.optionsCSV.delimiter);
    }
    
    _reducer(prevLine, nextLine) {
        return prevLine + this.optionsCSV.escape + nextLine;
    }
    
    _firstLine(resource, delimiter) {
        const fields = this.optionsCSV.fields;
        const all = fields.length === 0;
        
        return Object
            .keys(resource[0])
            .filter(field => fields.includes(field) || all)
            .map(this._quoted)
            .join(delimiter)
    }
    
    _quoted(prop) {
        return this.optionsCSV.quote + prop + this.optionsCSV.quote
    }
    
    _cuted(object) {
        const fields = this.optionsCSV.fields;
        return Object.keys(object)
                     .filter(key => fields.includes(key))
                     .reduce((obj, key) => {
                         obj[key] = object[key];
            
                         return obj;
                     }, {});
    }
    
    _destination(csv) {
        const { destination, ext, pack } = this.optionsCSV;
        let pathTo = destination;
        if (destination === 'inherit') {
            pathTo = join(dirname(this.resource), basename(this.resource, '.json') + `.${ext}`)
        }
        
        if (pack) {
            pathTo += Archiver.ext;
            const arch = new Archiver({ out: pathTo });
            arch.create(csv, () => {
                console.info('create archive, done!');
                arch.extract(fs.readFileSync(pathTo), () => console.log(`extract archive ${pathTo}, done!`))
            });
        } else {
            fs.writeFile(pathTo, csv);
        }
    }
}

module.exports = formatConverter;
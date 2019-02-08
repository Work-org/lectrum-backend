class formatConverter {
    constructor({ csv = null }) {
        this.default = {
            csv: {
                delimiter:    ',',
                escape:       '\n',
                quote:        '',
                hasFirstLine: true,
                fields:       [],
                lines:        null
            },
            // json: {}
        };
        this.optionsCSV = Object.assign({}, this.default.csv, csv !== null ? csv : {});
        this._reducer = this._reducer.bind(this);
        this._lookFor = this._lookFor.bind(this);
        this._quoted = this._quoted.bind(this);
        this._cuted = this._cuted.bind(this);
        // this.optionsJSON = !json ? this.default.json : json;
    }
    
    convert(resource, cb = function () {}) {
        try {
            const { delimiter, escape, hasFirstLine } = this.optionsCSV;
    
            const firstLine = hasFirstLine ? this._firstLine(resource, delimiter, escape) : '';
            const retrieved = resource
                .map(this._lookFor)
                .reduce(this._reducer, firstLine);
    
            cb(null, retrieved);
        } catch (error) {
            cb(error);
        }
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
    
    _firstLine(resource, delimiter/*, escape*/) {
        return Object
            .keys(resource[0])
            .map(this._quoted)
            .join(delimiter) /*+ escape*/
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
}

module.exports = formatConverter;
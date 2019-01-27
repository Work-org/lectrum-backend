//Service function to found timer by name and callback
function detect(name, callback = console.log.call(null, arguments)) {
    check(name, 'string');
    
    return callback(this.timers.filter(({body}) => body.name === name)[0] || null);
}

//#NOTE7
function duplicate(name) {
    const found = this.timers.filter(({body}) => body.name === name);
    if (found.length > 0) {
        throw new Error('Task is exist');
    }
    
    return this;
}

//#NOTE12345
function check(value, type = null) {
    let message = null;
    
    if (!(value instanceof Array)) {
        value = [[value, type]];
    }
    
    value.forEach(([val, type]) => {
        if (val === undefined || !(typeof val === type)) {
            message = `parameter undefined or wrong type [${type}]`;
        }
        
        if (type === 'string' && val === '') {
            message = 'parameter must not be an empty string';
        }
        
        if (type === 'number' && (val > 5000 || val < 0)) {
            message = 'parameter must belong to gap between 0 and 5000';
        }
        
        if (message) {
            throw new Error(message);
        }
    });
    
    return this;
}

function fire (cb, body) {
    const out = cb.call();
    console.log('-->', out, this);
    
    this._log({
        name   : body.name,
        in     : body.job.gett(),
        out    : out,
        created: Date.now()
    });
}

module.exports = {check, detect, duplicate, fire};
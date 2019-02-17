//#NOTE7
function duplicate(name) {
    const found = this.timers.filter(({ body }) => body.name === name);
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

function refresh() {
    clearTimeout(this._timer);
    console.info('   main timer update -->');
    this._timer =
        setTimeout(() => this.timers.map(({ body: { name } }) => this.remove(name)), this._afterTime + this._time);
    
    return this;
}

function max() {
    const timers = this.timers.map(({ body: { delay } }) => delay);
    this._afterTime = Math.max(...timers);
    
    return this;
}

module.exports = { check, duplicate, refresh, max };
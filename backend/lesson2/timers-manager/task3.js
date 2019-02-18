// Module
const TimersManager = require('./module');
const manager = new TimersManager();

const t1 = {
    name    : 't1',
    delay   : 1000,
    interval: false,
    job     : (a, b) => a + b
};

const t2 = {
    name    : 't2',
    delay   : 1000,
    interval: false,
    job     : () => {
        throw new Error('We have a problem')
    }
};

const t3 = {
    name    : 't3',
    delay   : 1000,
    interval: false,
    job     : n => n
};

manager
    .add(t1, 1, 2)
    .add(t2)
    .add(t3, 1);
manager.start();

setTimeout(() => manager.print(), 2000);

// Module
const TimersManager = require('./module');
const manager = new TimersManager();

const t1 = {
    name    : 't1',
    delay   : 1000,
    interval: false,
    job     : (a, b) => {
        const c = a + b;
        return c;
    }
};

manager.add(t1, 1000, -2);
manager.start();

// wait for job run
setTimeout(() => manager.print(), 2000);

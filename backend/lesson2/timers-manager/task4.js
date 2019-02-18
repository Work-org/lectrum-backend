// Module
const TimersManager = require('./module');
const manager = new TimersManager();

const t1 = {
    name    : 't1',
    delay   : 200,
    interval: false,
    job     : (a, b) => a + b
};

const t2 = {
    name    : 't2',
    delay   : 1200,
    interval: false,
    job     : () => {
        throw new Error('We have a problem')
    }
};

const t3 = {
    name    : 't3',
    delay   : 4700,
    interval: true,
    job     : n => n
};

manager
    .add(t1, 1, 2)
    .add(t2)
    .add(t3, 1);
manager.start();

// setTimeout(() => manager.list(), 2000);
// setTimeout(() => manager.remove('t2'), 3000);
// setTimeout(() => manager.pause('t3'), 3100);
// setTimeout(() => manager.resume('t3'), 3500); // update timer main

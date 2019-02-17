// Module
const TimersManager = require('./module');
const manager = new TimersManager();

const t1 = {
    name    : 't1',
    delay   : 3000,
    interval: false,
    job     : () => {
        console.log('>>>> job 1 finished')
    }
};

const t2 = {
    name    : 't2',
    delay   : 490,
    interval: true,
    job     : (a, b) => {
        const c = a + b;
        console.log('>>>> job2', a, b, c);
        return c;
    }
};

manager
    .add(t1)
    .add(t2, 1, 2);
manager.start();
// console.log(manager.list());

// manager.stop();

setTimeout(() => manager.stop(), 3000);

setTimeout(() => manager.pause('t2'), 1000);

setTimeout(() => manager.resume('t2'), 1700);

setTimeout(() => manager.remove('t2'), 2500);

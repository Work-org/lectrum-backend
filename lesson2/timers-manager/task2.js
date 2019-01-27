// Module
const manager = require('./module');

const t1 = {
    name    : 't1',
    delay   : 1000,
    interval: false,
    job     : (a, b) => {
        const c = a + b;
        console.log('>>>> job2', a, b, c);
        return c;
    }
};

manager.add(t1, 1000, -2);
manager.start();
setTimeout(() => manager.print(), 2000);

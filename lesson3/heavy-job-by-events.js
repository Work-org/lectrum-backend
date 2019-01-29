const EventEmitter = require('events').EventEmitter;
const doJob        = items => {
    let count = 0;
    for (let i = 0; i < items; i++) {
        if (Math.round(Math.log(Math.sqrt(Math.abs(Math.round(Math.random() * 1000))))) === 1) {
            count++;
        }
    }
    
    return count;
};

class HeavyJob extends EventEmitter {
    constructor(iterate) {
        super();
        this.total  = 1e8;
        this.cuts   = iterate || 100;
        this.counts = 0;
    }
    
    run(cb) {
        this.emit('start');
        this.on('chunk', cb => {
            this.counts = this.counts + cb(this.total / this.cuts);
            this.cuts--;
            
            if (!this.cuts) {
                this.emit('data', this.counts);
                this.emit('end');
            } else {
                setImmediate(() => this.emit('chunk', cb));
            }
        });
        
        this.emit('chunk', cb);
    }
}

const job = new HeavyJob(500);

job.on('start', () => console.log('start execution'));
job.on('end', () => console.log('end execution'));
job.on('data', data => {
    console.log('   count -->', data);
});

/*setInterval(() => {
    console.log('Not blocked!');
}, 1000);*/

// use TimersManager
const timeManager = require('../lesson2/timers-manager/module');

timeManager
    .add({
        name:     'not blocked interval',
        delay:    1000,
        interval: true,
        job:      () => console.log('Not blocked!')
    })
    .start();

job.run(doJob);


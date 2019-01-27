const {check, duplicate, detect} = require('./helper');


class TimersManager {
    constructor(timers = []) {
        this.timers = timers;
        this.run = false; // main factor START
        // this.check = ::check;
        this.check = check.bind(this);
        this.duplicate = duplicate.bind(this);
        this.detect = detect.bind(this);
    }
    
    add(body) {
        //#NOTE6
        if (this.run) {
            throw new Error('Don\'t add new task');
        }
        
        const {name, delay, interval, job} = body;
        
        return this
            .check([[name, 'string'], [delay, 'number'], [interval, 'boolean'], [job, 'function']])
            .duplicate(name)
            ._add(body, [...arguments].slice(1));
    }
    
    // noinspection JSUnusedGlobalSymbols
    list() {
        console.log(this.timers);
    }
    
    remove(name) {
        check(name, 'string');
        this.timers = this.timers
            .map(timer => {
                const {body, stop} = timer;
                // found by name, then added
                if (body.name === name) {
                    if (stop !== undefined) {
                        stop();
                        console.log("\n   stop -->", name);
                    } else {
                        console.log(`   > Timer ${name} was not started!`);
                    }
                    
                    console.log("\n   remove -->", name);
                    
                    return null;
                }
                
                return timer;
            })
            .filter(Boolean);
        
        if (this.timers.length === 0) {
            this.run = false;
        }
    }
    
    start() {
        this.run = true;
        console.log("\n   start -->");
        this.timers = this.timers.map(timer => this._prepare(timer));
    }
    
    stop() {
        this.run = false;
        this.timers.map(({stop, body}) => stop(body.name));
        console.log("\n   stop ALL -->", );
    }
    
    pause(name) {
        this.detect(name, ({stop, body}) => {
            stop(body.name);
            console.log("\n   pause -->", name);
        });
    }
    
    resume(name) {
        this.detect(name, this._prepare);
        console.log("\n   resume -->", name);
    }
    
    //todo how set static mode property class?
    // noinspection JSMethodCanBeStatic
    _prepare(timer) {
        const {body, call} = timer;
        const {name, delay, interval} = body;
        const timeFunction = interval ? setInterval : setTimeout;
        const clearTimeFunction = interval ? clearInterval : clearTimeout;
        
        timer['stop'] = clearTimeFunction.bind(global, timeFunction(call, delay));
        console.log('   _prepare -->', name);
        
        return timer;
    }
    
    _add(body, args) {
        const {name, job} = body;
        
        this
            .timers
            .push({
                body,
                call: job.bind(job, ...args),
            });
        
        console.log("\n   added -->", name);
        
        return this;
    }
}

module.exports = new TimersManager([]);
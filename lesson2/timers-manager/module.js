const {check, duplicate, detect, fire} = require('./helper');

class TimersManager {
    constructor() {
        this.timers = [];
        this.log = [];
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
        console.log("\n   stop ALL -->",);
    }
    
    pause(name) {
        this.detect(name, ({stop, body}) => {
            stop(body.name);
            console.log("\n   pause -->", name);
        });
    }
    
    print() {
        console.log("   print -->", JSON.stringify(this.log, null, 2));
    }
    
    resume(name) {
        this.detect(name, this._prepare);
        console.log("\n   resume -->", name);
    }
    
    _add(body, args) {
        const {name, job} = body;
        const callableArgument = () => arguments[1];
        job.gett = callableArgument.bind(job);
        
        this
            .timers
            .push({
                body,
                call: job.bind(job, ...args),
            });
        
        console.log("\n   added -->", name);
        
        return this;
    }
    
    _log(object) {
        this.log.push(object);
    }
    
    //todo how set static mode property class?
    // noinspection JSMethodCanBeStatic
    _prepare(timer) {
        const {body, call} = timer;
        const {name, delay, interval} = body;
        const timeFunction = interval ? setInterval : setTimeout;
        const clearTimeFunction = interval ? clearInterval : clearTimeout;
        const manager = this;
        timer['stop'] = clearTimeFunction
        // .bind(global, timeFunction(call, delay));
            .bind(global, timeFunction(function () {
                let log = {
                    name   : body.name,
                    in     : body.job.gett().toString(),
                    created: (new Date()).toISOString()
                };
                
                try {
                    log.out = call.call();
                } catch (e) {
                    log.error = {
                        name   : e.name,
                        message: e.message,
                        stack  : e.stack.split("\n")
                    }
                }
                
                if (manager) {
                    manager._log(log);
                }
            }, delay));
        console.log('   _prepare -->', name);
        
        
        return timer;
    }
}

module.exports = new TimersManager();
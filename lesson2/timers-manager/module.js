const {check, duplicate, refresh, max} = require('./helper');

class TimersManager {
    constructor(ttl = false) {
        this.timers = [];
        this.log = [];
        this.run = false; // main factor START
        // this.check = ::check;
        this.check = check.bind(this);
        this.duplicate = duplicate.bind(this);
        this.refresh = refresh.bind(this);
        this.max = max.bind(this);
        this._afterTime = 0;
        this._time = 10000;
        this._timer = setTimeout(function (){}, this._time);
        
        if (!ttl) {
            console.info = () => {};
        }
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
            // .refresh(delay) // timer main start when add timer
            ._add(body, [...arguments].slice(1))
            .max();
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
                        console.info("\n   stop -->", name);
                    } else {
                        console.info(`   > Timer ${name} was not started!`);
                    }
                    
                    console.info("\n   remove -->", name);
                    
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
        console.info("\n   start -->");
        this.timers = this.timers.map(timer => this._prepare(timer));
    }
    
    stop() {
        this.run = false;
        this.timers.map(({stop, body}) => stop(body.name));
        console.info("\n   stop ALL -->",);
    }
    
    pause(name) {
        check(name, 'string');
        const detect = this.timers.filter(({body}) => body.name === name)[0];
        const {stop, body} = detect;
        stop(body.name);
        console.info("\n   pause -->", name);
    }
    
    print() {
        console.log("   print -->", JSON.stringify(this.log, null, 2));
    }
    
    resume(name) {
        check(name, 'string');
        const detect = this.timers.filter(({body}) => body.name === name)[0];
        this._prepare(detect);
        console.info("\n   resume -->", name);
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
        
        console.info("\n   added -->", name);
        
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
        // update timer main
        const manager = this.refresh();
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
        console.info('   _prepare -->', name);
        
        
        return timer;
    }
}

module.exports = new TimersManager();
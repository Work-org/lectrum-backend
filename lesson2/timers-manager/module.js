const { check, duplicate, refresh, max } = require('./helper');
const dg = require('debug');
const debugRemove = dg('TM:data');
const debugStart = dg('TM:start');
const debugStop = dg('TM:stop');
const debugPause = dg('TM:pause');
const debugResume = dg('TM:resume');
const debugAdd = dg('TM:add');
const debugPrep = dg('TM:prepare');

class TimersManager {
    constructor() {
        this._afterTime = 0;
        this.duplicate = duplicate.bind(this);
        this.refresh = refresh.bind(this);
        this._timer = null;
        this.timers = [];
        this.check = check.bind(this);
        this._time = 10000;
        this.log = [];
        this.run = false; // main factor START
        this.max = max.bind(this);
    }
    
    add(body) {
        //#NOTE6
        if (this.run) {
            throw new Error('Don\'t add new task');
        }
        const { name, delay, interval, job } = body;
        
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
                              const { body, stop } = timer;
                              // found by name, then added
                              if (body.name === name) {
                                  if (stop) {
                                      stop();
                                      debugRemove("\n   stop -->", name);
                                  } else {
                                      debugRemove(`   > Timer ${name} was not started!`);
                                  }
                                  debugRemove("\n   remove -->", name);
                
                                  return null;
                              }
            
                              return timer;
                          })
                          .filter(Boolean);
        
        if (!this.timers.length) {
            this.run = false;
        }
    }
    
    start() {
        this.run = true;
        this._timer = setTimeout(function () {}, this._time);
        debugStart("\n   start -->");
        this.timers = this.timers.map(timer => this._prepare(timer));
    }
    
    stop() {
        this.run = false;
        this.timers.map(({ stop, body }) => stop(body.name));
        debugStop("\n   stop ALL -->");
    }
    
    pause(name) {
        check(name, 'string');
        const detect = this.timers.find(({ body }) => body.name === name)[0];
        const { stop, body } = detect;
        stop(body.name);
        debugPause("\n   pause -->", name);
    }
    
    print() {
        console.log("   print -->", JSON.stringify(this.log, null, 2));
    }
    
    resume(name) {
        check(name, 'string');
        const detect = this.timers.find(({ body }) => body.name === name)[0];
        this._prepare(detect);
        debugResume("\n   resume -->", name);
    }
    
    _add(body, args) {
        const { name, job } = body;
        const callableArgument = () => arguments[1]; //@todo spread operator for arg job
        job.gett = callableArgument.bind(job);
        
        this
            .timers
            .push({
                body,
                call: job.bind(job, ...args),
            });
        debugAdd("\n   added -->", name);
        
        return this;
    }
    
    _log(object) {
        this.log.push(object);
    }
    
    //todo how set static mode property class?
    // noinspection JSMethodCanBeStatic
    _prepare(timer) {
        const { body, call } = timer;
        const { name, delay, interval } = body;
        const timeFunction = interval ? setInterval : setTimeout;
        const clearTimeFunction = interval ? clearInterval : clearTimeout;
        // update timer main
        const manager = this.refresh();
        timer['stop'] = clearTimeFunction
        // .bind(global, timeFunction(call, delay));
            .bind(global, timeFunction(function () {
                let log = {
                    name:    body.name,
                    in:      body.job.gett().toString(),
                    created: (new Date()).toISOString()
                };
                
                try {
                    log.out = call.call();
                } catch (e) {
                    log.error = {
                        name:    e.name,
                        message: e.message,
                        stack:   e.stack.split("\n")
                    }
                }
                
                if (manager) {
                    manager._log(log);
                }
            }, delay));
        debugPrep('   _prepare -->', name);
        
        return timer;
    }
}

module.exports = TimersManager;
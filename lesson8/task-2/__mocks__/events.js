class EventEmitter {
    constructor() {
        this.customers = [];
        this.eventListeners = {};
    }
    
    on(type, listener) {
        if (!this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }
        this.eventListeners[type].push(listener);
    }
    
    emit(type, ...args) {
        if (this.eventListeners[type]) {
            this.eventListeners[type]
                .forEach(listener => {
                    listener.call(listener, ...args);
                });
        }
    }
}

module.exports = EventEmitter;
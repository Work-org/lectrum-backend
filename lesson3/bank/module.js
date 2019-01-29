const EventEmitter = require('events').EventEmitter;

class Bank extends EventEmitter {
    constructor() {
        super();
        this.accountsBank = [];
        this.operations   = {
            add:      Symbol('add'),
            get:      Symbol('get'),
            withdraw: Symbol('withdraw')
        };
        this.valid        = this._valid.bind(this);
        
        this.on('error', error => {
            console.error(error.name + ` --> ${error.message}`);
        });
        
        try {
            this.on('add', (...options) => this._account(options[0])[this.operations.add](options[1]));
            this.on('get', (...options) => {
                options[1](this._account(options[0])[this.operations.get]());
            });
            this.on('withdraw', (...options) => this._account(options[0])[this.operations.withdraw](options[1]));
        } catch (error) {
            this.emit('error', error);
        }
    }
    
    register(account) {
        return this._register(account);
    }
    
    _register(account) {
        this._check(account);
        const _self = this;
        
        const key = (new Date()).getTime();
        this
            .accountsBank
            .push({
                ...account,
                personId:                   key,
                [this.operations.add]:      function (sum) {
                    if (_self.valid(_self.operations.add, sum)) {
                        this.balance += sum;
                        console.log(`${account.name} added ${sum}₴ to my account`);
                    }
                },
                [this.operations.get]:      function () {
                    return this.balance;
                },
                [this.operations.withdraw]: function (sum) {
                    if (_self.valid(_self.operations.withdraw, sum, this.personId)) {
                        console.log(`${account.name} took ${sum}₴ from my account`);
                        this.balance -= sum;
                    }
                }
            });
        console.log(`${account.name} registered at bank, my balance ${account.balance}₴`);
        
        return key;
    }
    
    _account(personalId) {
        return this.accountsBank.find(person => person.personId === personalId);
    }
    
    _check({ name, balance }) {
        const account = this.accountsBank.find(account => account.name === name);
        if (account) {
            this.emit('error', new TypeError(`Person already exist. Try another name`));
        }
        
        if (balance <= 0) {
            this.emit('error', new TypeError('Balance should not be less zero'));
        }
    }
    
    _valid(operation, ...options) {
        const [sum, personalId] = options;
        
        switch (operation) {
            case this.operations.add:
                if (sum <= 0) {
                    this.emit('error', new TypeError('Sum add should not be less zero'));
                    return false;
                }
                break;
            
            case this.operations.withdraw:
                if (sum < 0) {
                    this.emit('error', new TypeError('Sum withdraw should be more zero'));
                    
                    return false;
                }
                
                const account = this._account(personalId);
                if (account.balance - sum < 0) {
                    this.emit('error', new TypeError('Insufficient funds'));
                    
                    return false;
                }
                
                break;
            
            default:
                break;
        }
        
        return true;
    }
}

module.exports = Bank;
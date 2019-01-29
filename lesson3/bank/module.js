const EventEmitter = require('events').EventEmitter;

class Bank extends EventEmitter {
    constructor() {
        super();
        this.accountsBank = [];
        this.operations = {
            add: Symbol('add'),
            get: Symbol('get'),
            withdraw: Symbol('withdraw')
        };
        
        this.on('add', (...options) => this._account(options[0])[this.operations.add](options[1]));
        this.on('get', (...options) => {
            options[1](this._account(options[0])[this.operations.get]());
        });
        this.on('withdraw', (...options) => this._account(options[0])[this.operations.withdraw](options[1]));
    }
    
    register(account) {
        return this._register(account);
    }
    
    _register(account) {
        const key = (new Date()).getTime();
        this
            .accountsBank
            .push({
                ...account,
                personId: key,
                [this.operations.add]: function (sum) {
                    this.balance += sum;
                    console.log(`${account.name} added ${sum}₴ to my account`);
                    return this;
                },
                [this.operations.get]: function () {
                    return this.balance;
                },
                [this.operations.withdraw]: function (sum) {
                    console.log(`${account.name} took ${sum}₴ from my account`);
                    this.balance -= sum;
                }
            });
        console.log(`${account.name} registered at bank, my balance ${account.balance}₴`);
        
        return key;
    }
    
    _account(personalId) {
        return this.accountsBank.find(person => person.personId === personalId);
    }
}

module.exports = Bank;
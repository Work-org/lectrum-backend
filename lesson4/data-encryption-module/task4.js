const {Ui, AccountManager, Decryptor, Logger} = require('./stream');

const customers = [
    {
        payload: {
            name: 'Pitter Black',
            email: '70626c61636b40656d61696c2e636f6d',
            password: '70626c61636b5f313233'
        },
        meta: {
            algorithm: 'hex'
        }
    }
];
const ui = new Ui(customers, {objectMode: true});
const decryptor = new Decryptor({objectMode: true});
const logg = new Logger({objectMode: true});
const manager = new AccountManager({objectMode: true});
ui
    .pipe(decryptor)
    .pipe(logg)
    .pipe(manager);
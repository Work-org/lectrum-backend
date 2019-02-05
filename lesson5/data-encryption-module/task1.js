const { Ui, AccountManager, Guardian } = require('./stream');

const algorithm   = 'aes192';
const password    = '1qaZxsw2@3edcVfr4';
const credentials = [algorithm, password];

const customers = [
    {
        name:     'Pitter Black',
        email:    'pblack@email.com',
        password: 'pblack_123',
    },
    {
        name:     'Oliver White',
        email:    'owhite@email.com',
        password: 'owhite_456',
    }
];

const ui       = new Ui(customers, { objectMode: true, highWaterMark: 1 });
const guardian = new Guardian({
    readableObjectMode: true,
    writableObjectMode: true,
    decodeStrings:      false
}, credentials, true);
const manager  = new AccountManager({ objectMode: true }, credentials);
ui.pipe(guardian).pipe(manager);
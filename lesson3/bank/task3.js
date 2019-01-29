const Bank = require('./module');

const bank     = new Bank();
const personId = bank.register({
    name:    'Oliver White',
    balance: 700,
    limit:   amount => amount < 10
});
const secondId = bank.register({
    name:    'Peter Pen',
    balance: 2
});

bank.emit('withdraw', personId, 5);

bank.emit('get', personId, (amount) => console.log(`I have ${amount}₴`)); // I have 695₴
bank.emit('withdraw', personId, 15); // Error 15 > 10

// Вариант 1
bank.emit('changeLimit', personId, (amount, currentBalance, updatedBalance) => amount > 100 && updatedBalance > 0);
bank.emit('send', personId, secondId, 699); // Error
// bank.emit('send', personId, secondId, 699); // Error
bank.emit('get', personId, (amount) => console.log(`I have ${amount}₴`)); // I have 695₴

// Вариант 2
bank.emit('changeLimit', personId, (amount, currentBalance, updatedBalance) => {
    return amount < 100 && updatedBalance > 700 && currentBalance > 800;
});

// Вариант 3
bank.emit('changeLimit', personId, (amount, currentBalance) => currentBalance > 800);

// Вариант 4
bank.emit('changeLimit', personId, (amount, currentBalance, updatedBalance) => updatedBalance > 900);
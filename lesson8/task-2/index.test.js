const EventEmitter = require('events');
const { Bank } = require('./');

jest.mock('events');

const bank = new Bank();
const fakeCustomerTrue = { name: 'True' };
const fakeCustomerDuplicate = fakeCustomerTrue;
let customerId = null; // huck )) don't run tests separate

describe('Test Bank class', () => {
    test('test constructor', () => {
        expect(bank).toBeInstanceOf(EventEmitter);
    });
    
    test('test register true', () => {
        customerId = bank.register(fakeCustomerTrue);
        expect(typeof customerId).toBe('number');
        expect(bank.customers.length).toBe(1);
        expect(Object.keys(bank.customers[0])).toEqual(["name", "id"]);
    });
    
    test('test register duplicate customer', () => {
        expect(() => bank.register(fakeCustomerDuplicate)).toThrow();
        expect(bank.customers.length).toBe(1);
    });
    
    test('test enroll fail', () => {
        expect(() => bank.emit('add', customerId, -1)).toThrow();
        expect(() => bank.emit('add', -1, 100)).toThrow();
    });
    
    test('test enroll', () => {
        bank.emit('add', customerId, 100);
    });
});
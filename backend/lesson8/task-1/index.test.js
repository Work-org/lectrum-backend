const { validate, validateFields } = require('./');

const fakeAttributeType = { data: '', name: '', instance: '' };
const fakeAttributePayload = (payload) => ({ data: { payload } });
const fakeDataType = { data: null };
const fakeValidData = { data: { payload: { name: 'Jon', email: 'some@emai.l', password: 'lkkfdjgo3i' } } };
const fakeDataUnAllowed = { data: { payload: {}, unAllowed: 'some' }, name: 'un' };
const fakeDataUnAllowedNest = {
    data: {
        payload: { unAllowed: 'some', name: 'sdf' },
        meta:    { source: 'ui' }
    },
    name: 'un'
};
const fakeValidDataFields = {
    data: {
        payload: {
            name:     'Jon',
            email:    'some@emai.l',
            password: 'lkkfdjgo3i'
        },
        meta:    {
            source:    'ui',
            algorithm: 'hex'
        }
    }
};

describe('Test validate helper:', () => {
    test('test arguments', async () => {
        expect(() => validate()).toThrow(TypeError);
    });
    
    test('test argument\'s type', () => {
        expect(() => validate(fakeAttributeType))
            .toThrow(`${fakeAttributeType.name}: payload should be an object`);
    });
    
    test('test argument data:payload', () => {
        // name check
        expect(() => validate(fakeAttributePayload({ 'foo': 'bar' })))
            .toThrow(`${fakeAttributeType.name}: payload should have required field name`);
        
        expect(() => validate(fakeAttributePayload({ name: '' })))
            .toThrow(`${fakeAttributeType.name}: payload.name should not be empty`);
        
        expect(() => validate(fakeAttributePayload({ name: { foo: 'bar' } })))
            .toThrow(`${fakeAttributeType.name}: payload.name should should be a string`);
        
        
        // email check
        expect(() => validate(fakeAttributePayload({ name: 'bar' })))
            .toThrow(`${fakeAttributeType.name}: payload should have required field email`);
        
        expect(() => validate(fakeAttributePayload({ name: 'bar', email: { foo: 'bar' } })))
            .toThrow(`${fakeAttributeType.name}: payload.email should should be a string`);
        
        expect(() => validate(fakeAttributePayload({ name: 'bar', email: '' })))
            .toThrow(`${fakeAttributeType.name}: payload.email should not be empty`);
        
        // password check
        expect(() => validate(fakeAttributePayload({ name: 'bar', email: 'foo' })))
            .toThrow(`${fakeAttributeType.name}: payload should have required field password`);
        
        expect(() => validate(fakeAttributePayload({ name: 'bar', email: 'foo', password: '' })))
            .toThrow(`${fakeAttributeType.name}: payload.password should not be empty`);
        
        expect(() => validate(fakeAttributePayload({ name: 'bar', email: 'foo', password: {} })))
            .toThrow(`${fakeAttributeType.name}: payload.password should should be a string`);
    });
    
    test('test valid data case', () => {
        expect(() => validate(fakeValidData)).not.toThrow();
    });
});

describe('Test validateFields helper:', () => {
    test('test valid data case', () => {
        expect(() => validateFields(fakeValidDataFields)).not.toThrow();
    });
    
    test('test absence of arguments', () => {
        expect(() => validateFields()).toThrow(TypeError);
    });
    
    test('test wrong type argument', () => {
        validateFields(fakeDataType);
        expect(true).toBe(true);
    });
    
    test('test unallowed field', () => {
        expect(() => validateFields(fakeDataUnAllowed))
            .toThrow(`${fakeDataUnAllowed.name}: data contains not allowed field — unAllowed`)
    });
    
    test('test unallowed field nest', () => {
        expect(() => validateFields(fakeDataUnAllowedNest))
            .toThrow(`${fakeDataUnAllowedNest.name}: data contains not allowed field — unAllowed`)
    });
    
    test('test not exist nest field', () => {
        expect(() => validateFields(fakeDataUnAllowedNest)).toThrow(Error);
    });
});
const getData = (response) => {
    return response.body.data || null;
};
let authorize, server;

describe('classes test', () => {
    beforeAll(async done => {
        await global.authorize((response) => {
            expect(response.statusCode).toBe(204);
        });
        done();
    });
    
    // /:classId/gradebook
    test('GET classes/:classId/gradebook', async done => {
        const response = await global.server.get('/api/classes/1/gradebook');
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('POST classes/:classId/gradebook', async done => {
        const response = await global.server.post('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('PUT classes/:classId/gradebook', async done => {
        const response = await global.server.put('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('DELETE classes/:classId/gradebook', async done => {
        const response = await global.server.delete('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(204);
        const data = getData(response);
        
        expect(data).toEqual(null);
        done();
    });
});
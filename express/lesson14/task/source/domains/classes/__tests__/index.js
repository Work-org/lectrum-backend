const getData = (response) => {
    return response.body.data || null;
};

describe('classes test', () => {
    beforeAll(async done => {
        await global.authorize((response) => {
            expect(response.statusCode).toBe(204);
        });
        done();
    });
    
    test('GET classes', async done => {
        const response = await global.server.get('/api/classes');
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual([]);
        done();
    });
    
    test('POST classes', async done => {
        const email = process.email;
        const response = await global.server.post('/api/classes').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual([]);
        done();
    });
});
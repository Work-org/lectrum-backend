const getData = (response) => {
    return response.body.data || null;
};

describe('classes test', () => {
    beforeAll(async done => {
        await process.authorize((response) => {
            expect(response.statusCode).toBe(204);
        });
        done();
    });
    
    test('GET classes', async done => {
        const response = await process.server.get('/api/classes');
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual([]);
        done();
    });
    
    test('POST classes', async done => {
        const email = process.email;
        const response = await process.server.post('/api/classes').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual([]);
        done();
    });
    
    // /:classId
    test('GET classes/:classId', async done => {
        const response = await process.server.get('/api/classes/1');
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('POST classes/:classId', async done => {
        const email = process.email;
        const response = await process.server.post('/api/classes/:classId').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('PUT classes/:classId', async done => {
        const email = process.email;
        const response = await process.server.put('/api/classes/:classId').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('DELETE classes/:classId', async done => {
        const email = process.email;
        const response = await process.server.delete('/api/classes/:classId').send({ email });
        expect(response.statusCode).toBe(204);
        const data = getData(response);
        
        expect(data).toEqual(null);
        done();
    });
    
    // /:classId/gradebook
    test('GET classes/:classId/gradebook', async done => {
        const response = await process.server.get('/api/classes/1/gradebook');
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('POST classes/:classId/gradebook', async done => {
        const email = process.email;
        const response = await process.server.post('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('PUT classes/:classId/gradebook', async done => {
        const email = process.email;
        const response = await process.server.put('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(200);
        const data = getData(response);
        
        expect(data).toEqual({});
        done();
    });
    
    test('DELETE classes/:classId/gradebook', async done => {
        const email = process.email;
        const response = await process.server.delete('/api/classes/:classId/gradebook').send({ email });
        expect(response.statusCode).toBe(204);
        const data = getData(response);
        
        expect(data).toEqual(null);
        done();
    });
});
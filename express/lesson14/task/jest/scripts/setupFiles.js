/*
(async (gl) => {
    console.log('-->', gl.t);
    const email = 'amRvZUBlbWFpbC5jb20=';
    const password = '';
    const response = await server.post('/api/auth/login').send({ email, password });
    
    expect(response.statusCode).toBe(204);
    
    const cookie = response.headers['set-cookie'][0];
    
    // This is not a documented behavior and should be used carefully
    server.jar.setCookie(cookie);
})(global);

*/

require('@babel/register')({
    presets: ['@babel/preset-env']
});

// Core
const NodeEnvironment = require('jest-environment-node');
const request = require('supertest');

// Instruments
const { app } = require('../../source/server.js');
const server = request.agent(app);

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }
    
    async setup() {
        await super.setup();
        const email = 'amRvZUBlbWFpbC5jb20=';
        const password = '';
        
        this.global.email = email;
        this.global.server = server;
        this.global.authorize = async (callback = function () {}) => {
            const response = await server.post('/api/auth/login').send({ email, password });
            callback(response); // for test authorize
            const cookie = response.headers['set-cookie'][0];
            
            // This is not a documented behavior and should be used carefully
            server.jar.setCookie(cookie);
        };
    }
    
    async teardown() {
        await super.teardown();
    }
    
    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;
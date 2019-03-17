/* Global setup module.
 **
 ** This module exports an async function that is triggered
 ** once before all test suites.
 **
 */
const request = require('supertest');
const chalk = require('chalk');
const path = require('path');
require('dotenv').config({ path: path.resolve('.env.test') });

// Instruments
const { app } = require('../../source/server.js');
const server = request.agent(app);

module.exports = function () {
    console.log(chalk.green('λ'));
    
    process.email = 'amRvZUBlbWFpbC5jb20=';
    process.server = server;
    process.authorize = async (callback = function (){}) => {
        const password = '';
        const response = await process.server.post('/api/auth/login').send({ email: process.email, password });
        callback(response); // for test authorize
        const cookie = response.headers['set-cookie'][0];
        
        // This is not a documented behavior and should be used carefully
        server.jar.setCookie(cookie);
    }
};

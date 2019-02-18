const net = require('net');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const Filter = require('./filter');
const Reader = require('./reader');
const promisify = require('util').promisify;

const server = net.createServer();
const PORT = process.env.PORT || 8080;

const schemaFilter = Joi
    .object()
    .keys({
        name:    Joi
                     .object()
                     .keys({
                         first: Joi.string(),
                         last:  'd'
                     })
                     .unknown(false),
        phone:   Joi.string(),
        address: Joi
                     .object()
                     .keys({
                         zip:     Joi.string(),
                         city:    Joi.string(),
                         country: Joi.string(),
                         street:  Joi.string(),
                         email:   Joi.string()
                     })
                     .unknown(false)
    })
    .unknown(false);

// schemaFilter.requiredKeys('name', 'address', 'name.first');

server.on('connection', socket => {
    console.log('New client connected!');
    const readFile = promisify(fs.readFile);
    
    socket.on('data', chunk => {
        const filterObject = JSON.parse(chunk);
        Joi.validate(filterObject, schemaFilter, async (err, validFilter) => {
            if (err) throw err;
            // console.log('-->', validFilter, path.resolve('../users.json'));
            const users = await readFile(path.resolve('../users.json'));
            // console.log('-->', users);
            const reader = new Reader({
                objectMode:    true,
                highWaterMark: 1,
            }, JSON.parse(users));
            
            const filter = new Filter({
                highWaterMark:      1,
                objectMode:         true,
                readableObjectMode: false,
                writableObjectMode: true
            }, validFilter);
            reader
                .pipe(filter)
                .pipe(socket);
        });
    });
    
    socket.on('end', () => {
        console.log('Client is disconnected!');
    });
});

server.on('listening', () => {
    const { port } = server.address();
    console.log(`TCP Server started on port ${port}!`);
});

server.listen(PORT);

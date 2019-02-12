const net = require('net');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

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
                     .required()
                     .unknown(),
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
                     .required()
                     .unknown()
    });

server.on('connection', socket => {
    console.log('New client connected!');
    
    socket.on('data', chunk => {
        const filter = JSON.parse(chunk);
        console.log('filter -->', filter);
        Joi.validate(filter, schemaFilter, (err, validFilter) => {
            if (err) throw err;
            console.log('validFilter -->', validFilter);
        });
        /*const rs = fs.createReadStream(
            path.join('example-12/data', 'comments.csv')
        );
        rs.pipe(socket);*/
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

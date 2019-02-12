const net = require('net');

const client = new net.Socket();
client.connect(8080, () => {
    console.log('Connected!');
    const filter = {
        name: {},
        address: {},
        // phone2: ''
    };
    client.write(JSON.stringify(filter));
});

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed!');
});

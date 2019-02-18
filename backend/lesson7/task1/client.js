const net = require('net');

const client = new net.Socket();
client.connect(8080, () => {
    console.log('Connected!');
    const filter = {
        name: {
            first: 'Carissa'
        },
        address: {
            zip: '05945'
        },
        phone: '32'
    };
    /*
    *  {
        "id": 181,
        "name": {
            "first": "Carissa",
            "last": "Marks"
        },
        "phone": "212-473-5229",
        "address": {
            "zip": "05945",
            "city": "South Meaghan",
            "country": "Vietnam",
            "street": "072 Augustus Ville"
        },
        "email": "alejandrin46@hotmail.com"
    },
    * */
    client.write(JSON.stringify(filter));
});

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed!');
});

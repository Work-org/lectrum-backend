const fs = require('fs');
const customers = require('./data/comments.json');
const Converter = require('./json2csv');
const convertOptions = {
    csv:  {
        delimiter: ';',
        escape:    '\n',
        quote:     '"',
        // fields:    ['name', 'email', 'body'],
        fields:    ['id', 'email'],
        lines:     10
    },
    json: {}
};

// fs.createReadStream('./data/comments.json').pipe(json2csv);
// const json2csv = new Converter({objectMode: true}, convertOptions);
const json2csv = new Converter(convertOptions);
json2csv.convert(customers, (error, retrieved) => {
    if (error) throw error;
    
    console.log('res-->', retrieved)
});

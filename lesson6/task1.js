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

const json2csv = new Converter(convertOptions);
json2csv
    .convert('./data/comments.json', (error, retrieved) => {
        if (error) throw error;
        
        console.log('res-->', retrieved)
    });

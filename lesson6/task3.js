const Converter = require('./json2csv');
const convertOptions = {
    csv: {
        destination: 'inherit', // the same folder, and same name file without ext
        pack:        true
    },
};

const json2csv = new Converter(convertOptions);
json2csv.convert('./data/comments.json', (error, retrieved) => {
    if (error) throw error;
    // console.log('res-->', retrieved)
    
    json2csv.changeDestination('./data/arch/comments.csv.gz');
    json2csv.convert('./data/comments.json');
});
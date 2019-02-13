const Transform = require('stream').Transform;

class Filter extends Transform {
    constructor(props = {}, filter) {
        super(props);
        this.filter = filter;
    }
    
    _transform(chunk, encode, done) {
        // console.log('-->', chunk);
        const users = chunk;
        // console.log('-->', users);
        let diff = Object
            .keys(this.filter)
            .reduce((diff, key) => {
                if (typeof users[key] === 'string' && users[key].indexOf(this.filter[key]) !== -1) {
                    return { [key]: users[key] };
                }

                return {
                    ...diff,
                    [key]: users[key]
                }
            }, {});
        /*
        * let o1 = {
  one: 1,
  two: 2,
  three: 3
}

let o2 = {
  two: 2,
  three: 3,
  four: 4
}

let diff = Object.keys(o2).reduce((diff, key) => {
  if (o1[key] === o2[key]) return diff
  return {
    ...diff,
    [key]: o2[key]
  }
}, {})
        * */
        
        this.push(JSON.stringify(diff, null, 2));
        done();
    }
}

module.exports = Filter;
use
vosadchyj;

db.setProfilingLevel(2);
db.customers.drop();
db.createCollection('customers');

const counts = 300000;
const names = [
    'Melonie Maurice',
    'Amal Aumann',
    'Bettye Beverlin',
    'Florine Frady',
    'Delena Dancer',
    'Sydney Stjacques',
    'Irina Iser',
    'Jerrold Juckett',
    'Simon Stetson',
    'Giuseppina Gartin',
    'Lena Luk',
    'Chiquita Crockett',
    'Amelia Andrews',
    'Reggie Rother',
    'Stefania Stannard',
    'Myra Mollett',
    'Onita Ohm',
    'Jordan Jaycox',
    'Susana Sampsel',
    'Jetta Jorstad'
];
const random = function (to, from = 0) {
    return Math.floor(Math.random() * to - from) + from;
};

const generatePassword = function (length = 10) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    
    return retVal;
};

//task 1
db.customers.createIndex({ email: 1, create: -1 });
db.customers.createIndex({ "name.first": 1, "name.last": 1 });

//task 2
db.customers.createIndex({ email: 1, nickname: 1 }, { unique: 1 });

//task 3
db.customers.createIndex({
    email:        'text',
    nickname:     'text',
    "name.first": "text",
    "name.last":  "text"
});


let customers = [];
// fill customers
for (let i = 0; i < counts; i++) {
    const [first, last] = names[random(names.length)].split(' ');
    const nickname = `${first.toLowerCase()}_${last.toLowerCase()}`;
    const email = `${nickname}@email.com`;
    const password = generatePassword(10);
    
    customers.push({
        name:    { first, last },
        created: new Date(),
        nickname,
        email,
        password,
    });
}

print("========= customers filling start =========");
db.customers.insert(customers);
db.customers.count();
db.getProfilingStatus();
print("========= customers filling end =========");

const prof = db.system.profile.find().limit(1).sort({ ts: -1 });
print("----- last request ms ------", prof["millis"]);


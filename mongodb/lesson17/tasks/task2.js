use
vosadchyj;

db.customers.drop();
db.orders.drop();

db.createCollection('customers');
db.createCollection('orders');

const counts = 3000;
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
const products = [
    'Oranges',
    'Apples',
    'Carrots',
    'Bananas',
    'Lemons',
    'Potatoes',
    'Corn',
    'Pea',
    'Tomato'
];
const random = function (to, from = 0) {
    return Math.floor(Math.random() * to - from) + from;
};

let customers = [];
// fill customers
for (let i = 0; i < counts; i++) {
    const [first, last] = names[random(names.length)].split(' ');
    customers.push({
        name:    { first, last },
        balance: Math.ceil(Math.random() * 100000),
        created: new Date()
    });
}

print("========= customers filling start =========");
db.customers.insert(customers);
// db.customers.find({});
print("========= customers filling end =========")

let orders = [];
// fill orders
for (let i = 0; i < counts; i++) {
    const customerPay = random(names.length);
    const [first, last] = names[customerPay].split(' ');
    const customer = db.customers.findOne({ "name.first": first, "name.last": last }); // first finded
    
    if (customer) {
        orders.push({
            //@todo because lockup need collection ref
            customerId: customer._id,
            count:      random(10),
            price:      random(100, 20),
            discount:   random(30, 5),
            title:      'some title',
            product:    products[random(products.length - 1, 0)]
        });
    }
}

print("========= orders filling start =========");
db.orders.insert(orders);
// db.orders.find({});
print("========= orders filling end =========");

print("========= aggregate customers =========");
db.customers.aggregate([
    {
        // Can't filter null inside array
        $group: {
            _id:   "$_id",
            fName: { $first: "$name.first" },
            lName: { $first: "$name.last" },
        },
    },
    {
        $lookup:
            {
                from:     "orders",
                // localField:   "_id",
                // foreignField: "customerId",
                let:      { order_from: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$$order_from", "$customerId"] }
                        },
                    },
                    {
                        $group: {
                            _id:   "$product",
                            total: { $sum: 1 }
                        }
                    }
                ],
                as:       "orders"
            }
    },
    // if exist order
    {
        $match: { "orders": { $ne: [] } }
    }
], { allowDiskUse: true });//.pretty();
print("========= aggregate customers =========");

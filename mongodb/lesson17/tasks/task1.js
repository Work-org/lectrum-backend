use
vosadchyj;

db.customers.drop();
db.orders.drop();

db.createCollection('customers');
db.createCollection('orders');

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

let customers = [];
// fill customers
for (let i = 0; i < 300; i++) {
    const [first, last] = names[random(names.length)].split(' ');
    customers.push({
        name:    { first, last },
        balance: Math.ceil(Math.random() * 100000),
        created: new Date()
    });
}

print("========= customers filling start =========");
db.customers.insert(customers);
print("========= customers filling end =========")

const withOrder = random(10);
let orders = [];
// fill orders
for (let i = 0; i < withOrder; i++) {
    const [first, last] = names[i].split(' ');
    const customer = db.customers.findOne({ "name.first": first, "name.last": last }); // first finded
    orders.push({
        customerId: customer._id.valueOf(),
        count:      random(10),
        price:      random(100, 20),
        discount:   random(30, 5),
        title:      'some title',
        product:    'some product'
    });
}

print("========= orders filling start =========");
db.orders.insert(orders);
print("========= orders filling end =========");

print("========= aggregate customers =========");
db.customers.aggregate([
    {
        // Can't filter null inside array
        $group: {
            _id:    "$_id",
            fName:  { $first: "$name.first" },
            lName:  { $first: "$name.last" },
            orders: {
                $push: { // push if not nul????
                    $cond: {
                        if:   {
                            $ne: [
                                db.orders.findOne({ customerId: "$_id" }),
                                null
                            ]
                        },
                        then: db.orders.findOne(
                            { customerId: "$_id" },
                            { _id: true, count: true, price: true, discount: true, product: true }
                        ),
                        else: null
                    }
                }
            }
        }
    }
], { allowDiskUse: true });
print("========= aggregate customers =========");

use vosadchyj

print('============= orders count =============')
db.orders.count({});
print('============= orders count =============')

print('============= orders size =============')
db.orders.dataSize();
print('============= orders size =============')

print('============= customers size =============')
db.customers.dataSize();
print('============= customers size =============')

print('============= db size =============')
db.stats().dataSize;
print('============= db size =============')

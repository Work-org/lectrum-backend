const purchases = function (page = 1, size = 20) {
    return db.customers.aggregate([
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
        {
            $match: { "orders": { $ne: [] } }
        },
        { $skip: size * (page - 1) },
        { $limit: size }
    ], { allowDiskUse: true })
};
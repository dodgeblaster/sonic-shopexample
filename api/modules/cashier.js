module.exports = {
    api: {
        submitpayment: [
            {
                type: 'input',
                storeId: 'string',
                amount: 'number',
                products: 'string'
            },
            {
                type: 'guard',
                pk: '$storeId',
                sk: 'staff_{!sub}'
            },
            {
                type: 'add',
                id: '@id'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: '$storeId',
                    sk: 'payment_{$id}',
                    id: '$id',
                    amount: '$amount',
                    cashier: '!sub',
                    time: '@now',
                    products: '$products'
                }
            },
            {
                type: 'emit',
                event: 'paymentStarted',
                input: {
                    storeId: '$storeId',
                    id: '@output.id',
                    amount: '@output.amount',
                    products: '@output.products',
                    cashier: '@output.cashier',
                    status: 'started'
                }
            }
        ]
    },
    events: {
        core_paymentcompleted: [
            {
                type: 'input',
                storeId: 'string',
                id: 'string',
                status: 'string',
                statusDetails: 'string'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: '$storeId',
                    sk: 'payment_{$id}_status',
                    id: '$id',
                    status: '$status',
                    time: '@now',
                    statusDetails: '$statusDetails'
                }
            }
        ]
    }
}

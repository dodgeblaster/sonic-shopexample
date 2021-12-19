module.exports = {
    api: {
        makeadmin: [
            {
                type: 'input',
                email: 'string'
            },
            {
                type: 'users',
                action: 'add',
                email: '$email'
            },
            {
                type: 'db',
                action: 'set',
                input: {
                    pk: 'admins',
                    sk: '$userId'
                }
            },
            {
                type: 'emit',
                name: 'adminCreated',
                input: {
                    email: '$email'
                }
            },
            {
                type: 'output',
                pk: 'string',
                sk: 'string'
            }
        ]
    },
    config: {
        name: 'sonicstore',
        auth: true,
        eventBus: 'default'
    }
}

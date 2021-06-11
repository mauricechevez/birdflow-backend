//import all models
const { Journal } = require('./models')

Journal.create([
    {
        name: 'Chris',
        birds: [],
        entries: 'Hello, these are my birds',
        location: 'Washington DC',
    }
])
//import all models
const { Journal } = require('./models')

Journal.create([
    {
        name: 'Maurice Chevez',
        birds: [],
        entries: 'Hello, these are my birds',
        location: 'Washington DC',
    }
])
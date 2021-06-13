#  Birdflow API

Welcom to the Birdflow API. Used by the Birflow application to search and add birds to a user journal.
## Models

### User Model
```
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    timesLoggedIn: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
```

### Bird Model
```
const birdSchema = new Schema({
    sciName: String,
    comName: String,
    speciesCode: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    taxonOrder: Number,
    bandingCodes:[],
    comNameCodes: [],
    sciNameCodes: [],
    order: String,
    familyComName: String,
    familySciName: String
})
```

### State Model
```
const stateSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    birds: [String]
})
```

### Journal Model
```
const journalSchema = new mongoose.Schema({
    name: String,
    birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird'}],
    entries: String,
    location: String,
    userId: String
});
```

## Default Routes

### users.js
```
GET /api/users/test  Test that the api is working
POST /api/users/signup User signup route
POST /api/users/login  User login route
GET /api/users/profile (Private) User profile data
```

### search.js
```
GET api/search/states/ Show all states
GET api/search/states/:id Show all birds for a state
GET api/search/birds/:name Search for bird by name
GET api/search/birds/:name/:state Search for bird by name and state
```

### journals.js
```
GET -> /api/journal (Private) Display all user journals
GET -> /api/journals/:id (Private) Display a specific user journal
POST -> /api/journals (Private) Add a new journal
PUT -> /api/journals (Private) Update an existing journal
DELETE -> /api/journals/:id (Private) Delete a journal
```
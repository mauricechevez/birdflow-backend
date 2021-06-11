require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const { State } = require('./models');
const { Bird } = require('./models');
const { Journal } = require('./models');

// Journal.find({}, (err, journ) => {
//     if (err) console.log(err);
//     console.log(journ);
//     console.log(journ.location);
// });

Journal.findById('60c22d23d275a24c0c216cc1', (err, journ) =>{
    if (err) console.log(err);
    console.log(journ);
    console.log(journ.name);
    console.log(journ.entries);
    console.log(journ.location);
});

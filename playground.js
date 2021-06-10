const axios = require('axios');

// Get all of the region codes for the world.
// const regionCodes = {
//   method: 'get',
//   url: 'https://api.ebird.org/v2/ref/region/list/country/world',
//   headers: { 
//     'X-eBirdApiToken': 'fih16titjkth'
//   }
// };

// axios(regionCodes)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// Get all states for US
const { State } = require('./models');
// const config = {
//   method: 'get',
//   url: 'https://api.ebird.org/v2/ref/region/list/subnational1/US',
//   headers: { 
//     'X-eBirdApiToken': 'fih16titjkth'
//   }
// };
// axios(config)
// .then(function (response) {
//     State.insertMany(response.data)
// })
// .catch(function (error) {
//   console.log(error);
// });


// Get all birds for a state
const birdForState = async (code) => {const config = {
      method: 'get',
      url: `https://api.ebird.org/v2/product/spplist/${code}`,
      headers: { 
        'X-eBirdApiToken': 'fih16titjkth'
      }
    };
    axios(config)
    .then(function (response) {
        console.log(`----Birds for ${code}`)
        console.log(response.data);
        State.updateOne({code}, {$push: {birds:response.data}})
    })
    .catch(function (error) {
      console.log(error);
    });
}
// birdForState('US-AL')

// Select all states from State model and update with birds
const states = async () => {
    console.log('--- INSIDE OF STATE ---');
    const states = await State.find({});
    states.forEach((state) => {
        birdForState(state.code)
    })
}
// states()

State.find({}).then((res)=>console.log(res))


// Get the taxonomy for a bird
// const config = {
//     method: 'get',
//     url: 'https://api.ebird.org/v2/ref/taxonomy/ebird?species=bbwduc,wrspet',
//     headers: { 
//       'X-eBirdApiToken': 'fih16titjkth'
//     }
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
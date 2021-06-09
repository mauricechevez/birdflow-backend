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
// const config = {
//   method: 'get',
//   url: 'https://api.ebird.org/v2/ref/region/list/subnational1/US',
//   headers: { 
//     'X-eBirdApiToken': 'fih16titjkth'
//   }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });


// Get all birds for a state
// const config = {
//   method: 'get',
//   url: 'https://api.ebird.org/v2/product/spplist/US-AZ',
//   headers: { 
//     'X-eBirdApiToken': 'fih16titjkth'
//   }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });



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
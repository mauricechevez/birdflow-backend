require('dotenv').config();
const axios = require('axios');
const { State } = require('./models');
const { Bird } = require('./models');

// 1-----RUN FIRST
// Seed all states for US
// const config = {
//   method: 'get',
//   url: 'https://api.ebird.org/v2/ref/region/list/subnational1/US',
//   headers: { 
//     'X-eBirdApiToken': process.env.BIRD_API_TOKEN
//   }
// };
// axios(config)
// .then(function (response) {
//     console.log('---INSERTING STATES-----')
//     State.insertMany(response.data)
//     console.log('-----STATES UPDATED-----')
// })
// .catch(function (error) {
//   console.log(error);
// });

//2-----RUN SECOND
// Get all birds for a state
const birdForState = async (code) => {const config = {
    method: 'get',
    url: `https://api.ebird.org/v2/product/spplist/${code}`,
    headers: { 
      'X-eBirdApiToken': process.env.BIRD_API_TOKEN
    }
  };
  axios(config)
  .then(function (response) {
      console.log(`----Updating Birds for ${code}`)
      State.updateOne({code: code}, {$addToSet: {birds:response.data}}, (err, res)=>{
            if(err){
                  console.log(err)
            }else{
                  console.log(res)
            }
      })
      console.log('-----Birds Updated-----')
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Select all states from State model and update with birds
const states = async () => {
  console.log('--- INSIDE OF STATE ---');
  const states = await State.find({});
  states.forEach((state) => {
      birdForState(state.code)
  })
}
states()

// 3---------Run Last
// Get the taxonomy for a bird
// const config = {
//     method: 'get',
//     url: 'https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json',
//     headers: { 
//       'X-eBirdApiToken': process.env.BIRD_API_TOKEN
//     }
//   };
  
//   axios(config)
//   .then(function (response) {
//         console.log('-----INSERTING BIRDS-----')
//         Bird.insertMany(response.data)
//         console.log('----BIRDS INSERTED');
//   })
//   .catch(function (error) {
//         console.log(error);
//   });

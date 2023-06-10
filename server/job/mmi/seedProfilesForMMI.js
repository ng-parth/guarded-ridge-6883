var jobRunner = require('./../job-runner');
var Profile = require('./../../api/p-club/profile.model');
var City = require('./../../api/city/city.model');
const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");

const generateSeedProfileDate = (profileUsers, randomUsers, cities) => {
  // const users = [];
  const newProfiles = randomUsers.map((p, i) => {
    const {name: {first: name, last: surname}, location: l, picture: { large: imageUrl}, email, dob} = p;
    const {city, lat, lng} = cities[_.random(cities.length)];
    // const l = {
    //     "street": {
    //       "number": 3861,
    //       "name": "Ashoka Rd"
    //     },
    //     "city": "Farrukhabad",
    //     "state": "Manipur",
    //     "country": "India",
    //     "postcode": 82503,
    //     "coordinates": {
    //       "latitude": "-75.8440",
    //       "longitude": "-52.7133"
    //     },
    //     "timezone": {
    //       "offset": "+3:00",
    //       "description": "Baghdad, Riyadh, Moscow, St. Petersburg"
    //     }
    //   };
    const birthTime = moment(dob.date).format('H:m:s');
    const [year, month, date, hours, minutes, seconds]  = moment(`${profileUsers[i].birthDate} ${birthTime}`, 'D/M/YYYY H:m:s').format('YYYY,M,D,H,m,s').split(',');
    let newUser = {
      id: profileUsers[i].id,
      name,
      surname,
      imageUrl,
      address: `${l.street.number}, ${l.street.name}, ${city}, India`,
      contactNo: '98123-87654',
      email,
      birthTime,
      birthPlace: city,
      lat,
      lng,
      matchMakingData: {
        year: parseInt(year),
        month: parseInt(month),
        date: parseInt(date),
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        timezone: 5.5,
      }
    };
    return newUser;
  });
  return newProfiles;
}

const startProcess = async () => {
  try {
    console.log("Getting Profiles: ");
    const profiles = await Profile.find({});
    console.log('Profiles: ', profiles.length);
    const cities = await City.find({ iso2: 'IN' });
    console.log('Cities: ', cities.length);
    const groups = _.groupBy(profiles, 'gender');
    console.log('Groups: ', Object.keys( groups));
    console.log('Groups: Female', groups['Female']?.length);
    console.log('Groups: Male', groups['Male']?.length);
    let [{ data: femaleUsers}, {data: maleUsers}] = await Promise.all([
      axios.get(`https://randomuser.me/api/?results=${groups['Female']?.length}&gender=female&nat=in&noinfo&exc=registered,login,phone,cell`),
      axios.get(`https://randomuser.me/api/?results=${groups['Male']?.length}&gender=male&nat=in&noinfo`)
    ]);
    // console.log('F Profiles: ', femaleUsers);
    // console.log('Profiles: ', profiles.length);
    // console.log('Groups: ', Object.keys( groups));
    // console.log('Groups: Female', groups['Female']?.length);
    // console.log('Groups: Male', groups['Male']?.length);
    // console.log('Cities: ', cities.length);
    // console.log('Random Users: ', randomUsers);
    const femaleProfiles = generateSeedProfileDate(groups['Female'], femaleUsers.results, cities);
    const maleProfiles = generateSeedProfileDate(groups['Male'], maleUsers.results, cities);
    console.clear();
    console.log('FMP: ',femaleProfiles[0] );
    console.log('MP: ',maleProfiles[0] );

    // const matchResp = await axios.post(
    //   'https://json.freeastrologyapi.com/match-making/ashtakoot-score',
    //   {
    //     female: femaleProfiles[0].matchMakingData,
    //     male: maleProfiles[0].matchMakingData,
    //     config: { language: 'en' }
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-api-key': 'Vmt73TyT3R1UwWycR780p97Bf7KZ7UrS7mnlOObB'
    //     },
    //   }
    // );
    // console.log('Match: ', matchResp.data);
    const updatedProfilesPromises = [...femaleProfiles, ...maleProfiles].map(p => {
      return Profile.updateOne({id: p.id}, p, {new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: true }, function(err){
        if (err) console.log('Err update: ', p.idText);
      })
    });
    const allUpdateResp = await Promise.allSettled(updatedProfilesPromises);
    console.log('All Settled: Done');
    const failed = allUpdateResp.filter(p => p.status === 'rejected');
    if (!failed.length) {
      console.log('All records updated: ');
    } else {
      console.log('Some/All update failed: ', failed);
    }
  } catch (e) {
    console.log('Err in process: ', e);
  }
}

jobRunner('generateSeedProfileDate', startProcess);

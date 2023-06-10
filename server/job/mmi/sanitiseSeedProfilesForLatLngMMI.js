var jobRunner = require('./../job-runner');
var Profile = require('./../../api/p-club/profile.model');

const generateSanitizedProfilePromise = profiles => profiles.map((p, i) => {
  const {lat, lng, matchMakingData, id} = p;
  let updatedProfile = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    matchMakingData: {
      ...matchMakingData,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      timezone: 5.5,
    }
  };
  return Profile.updateOne({id}, updatedProfile, {new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: true }, function(err){
    if (err) console.log('Err update: ', p.idText);
  })
});


const startProcess = async () => {
  try {
    console.log("Getting Profiles: ");
    const profiles = await Profile.find({});
    console.log('Profiles: ', profiles.length);
    // console.clear();
    const updatedProfilesPromises = generateSanitizedProfilePromise(profiles);
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

jobRunner('sanitiseSeedProfilesForLatLngMMI', startProcess);

var jobRunner = require('./../job-runner');
var Profile = require('./../../api/p-club/profile.model');

const updateProfileDetails = p => {
    const {id, address, mangalShani, specs, birthPlace, birthTime, birthDate, idText} = p;
    const getId = () => {
      const arr = id.split(':-&nbsp;&nbsp;PROFILE OF ');
      if (arr.length === 2) {
        return parseInt(arr[0].replace('ID NO-', ''));
      } else {
        return id;
      }
    }
    const finalProfile = {
      id: getId(),
      birthPlace: birthPlace.replace('BIRTH\n      PLACE:-', ''),
      birthTime: birthTime.replace('BIRTH\n      TIME:-', ''),
      birthDate: birthDate.replace('D.O.B.-&nbsp;\n      ',''),
      address: address.replace('ADDRESS:-\n     ',''),
      mangalShani: mangalShani.replace('MANGAL/SHANI:-', ''),
      specs: specs.replace('SPECT:-', ''),
    }
  return finalProfile;
}

const startProcess = async () => {
  let profiles = await Profile.find({}, function(err, profiles) {
    if (err) console.log('Err @find: ', err);
  })
  console.log('Profiles: ', profiles.length);
  const updatedProfilesPromises = profiles.map(p => {
    return Profile.updateOne({idText: p.idText}, updateProfileDetails(p), {new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: true }, function(err){
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
}

jobRunner('sanitizeOldProfiles', startProcess);

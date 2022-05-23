var Profile = require('./profile.model');

const profiles = [[{"key":"id","value":"Id No:- 5671: PROFILE OF (GAJJAR) STUTI ","displayText":"Id"},{"key":"name","value":"(GAJJAR) STUTI ","displayText":"Name"},{"key":"surname","value":"SUTHAR","displayText":"Surname"},{"key":"age","value":"29","displayText":"Age"},{"key":"height","value":"5'-4''","displayText":"Height"},{"key":"weight","value":"70\n      K.G","displayText":"Weight"},{"key":"qualification","value":"M.COM.&nbsp;","displayText":"Qualification"},{"key":"occupation","value":"BANKING SECTOR","displayText":"Occupation"},{"key":"native","value":"UMARETH","displayText":"Native"},{"key":"father","value":"KAMLESHBHAI GAJJAR","displayText":"Father"},{"key":"fatherOccupation","value":"GRAPHICS DESIGNING","displayText":"Father's Occupation"},{"key":"mother","value":"BHARGAVIBEN GAJJAR","displayText":"Mother"},{"key":"motherOccupation","value":"HOUSE WIFE","displayText":"Mother's Occupation"},{"key":"brothers","value":"1","displayText":"Brothers"},{"key":"sisters","value":"0","displayText":"Sisters"},{"key":"familyIncome","value":"2,00,000","displayText":"Family Income"},{"key":"personalIncome","value":"4.00.000","displayText":"Personal Income"},{"key":"birthDate","value":"D.O.B.-&nbsp;\n      4/11/1992","displayText":"Birth Date"},{"key":"birthTime","value":"BIRTH\n      TIME:-12.54 PM","displayText":"Birth Time"},{"key":"birthPlace","value":"BIRTH\n      PLACE:-AHMEDABAD","displayText":"Birth Place"},{"key":"specs","value":"SPECT:-NO","displayText":"Specs"},{"key":"mangalShani","value":"MANGAL/SHANI:-MANGAL","displayText":"Mangal/Shani?"},{"key":"aboutMe","value":"","displayText":"About Me"},{"key":"imageUrl","value":"","displayText":"Image Url"}]];

exports.getPaginatedProfiles = function (req, resp) {
  console.log('getPaginatedProfiles: ', req);
  return resp.send(profiles);
}

exports.getProfileDetails = function (req, resp) {
  console.log('getProfileDetails: ', req);
  return  resp.send(profiles[0]);
}

exports.upsertProfile = function (req, resp) {
  var profile = req.body;
  console.log('upsertProfile: ', profile);
  Profile.findOneAndUpdate({id: profile.id}, profile, {upsert: true}, function(err, profileResp){
    if (err) return handleError(resp, err);
    console.log('Upsert success: ', profileResp);
    resp.send({status: 'success', id: profile.id});
  })
  // return resp.send({status: 'success'});
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {error: err});
}

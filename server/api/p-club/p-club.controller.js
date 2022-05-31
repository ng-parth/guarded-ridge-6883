var Profile = require('./profile.model');

// const profiles = [[{"key":"id","value":"Id No:- 5671: PROFILE OF (GAJJAR) STUTI ","displayText":"Id"},{"key":"name","value":"(GAJJAR) STUTI ","displayText":"Name"},{"key":"surname","value":"SUTHAR","displayText":"Surname"},{"key":"age","value":"29","displayText":"Age"},{"key":"height","value":"5'-4''","displayText":"Height"},{"key":"weight","value":"70\n      K.G","displayText":"Weight"},{"key":"qualification","value":"M.COM.&nbsp;","displayText":"Qualification"},{"key":"occupation","value":"BANKING SECTOR","displayText":"Occupation"},{"key":"native","value":"UMARETH","displayText":"Native"},{"key":"father","value":"KAMLESHBHAI GAJJAR","displayText":"Father"},{"key":"fatherOccupation","value":"GRAPHICS DESIGNING","displayText":"Father's Occupation"},{"key":"mother","value":"BHARGAVIBEN GAJJAR","displayText":"Mother"},{"key":"motherOccupation","value":"HOUSE WIFE","displayText":"Mother's Occupation"},{"key":"brothers","value":"1","displayText":"Brothers"},{"key":"sisters","value":"0","displayText":"Sisters"},{"key":"familyIncome","value":"2,00,000","displayText":"Family Income"},{"key":"personalIncome","value":"4.00.000","displayText":"Personal Income"},{"key":"birthDate","value":"D.O.B.-&nbsp;\n      4/11/1992","displayText":"Birth Date"},{"key":"birthTime","value":"BIRTH\n      TIME:-12.54 PM","displayText":"Birth Time"},{"key":"birthPlace","value":"BIRTH\n      PLACE:-AHMEDABAD","displayText":"Birth Place"},{"key":"specs","value":"SPECT:-NO","displayText":"Specs"},{"key":"mangalShani","value":"MANGAL/SHANI:-MANGAL","displayText":"Mangal/Shani?"},{"key":"aboutMe","value":"","displayText":"About Me"},{"key":"imageUrl","value":"","displayText":"Image Url"}]];

exports.getPaginatedProfiles = function (req, resp) {
  console.log('getPaginatedProfiles: ');
  Profile.find({ status: 'ACTIVE' }, function(err, profiles){
    if (err) return handleError(resp, err);
    resp.send({ status: 'success', data: profiles });
  })
}

exports.getProfileDetails = function (req, resp) {
  console.log('getProfileDetails: ', req.params);
  const { _id } = req.params;
  Profile.findOne({ _id }, function(err, profile) {
    if (err) return handleError(resp, err);
    resp.send({ status: 'success', data: profile });
  });
}

exports.upsertProfile = function (req, resp) {
  var profile = req.body;
  console.log('upsertProfile: ', profile);
  Profile.findOneAndUpdate({id: profile.id}, profile, {upsert: true}, function(err, profileResp){
    if (err) return handleError(resp, err);
    console.log('Upsert success: ', profileResp);
    resp.send({status: 'success', data: profile.id});
  })
}

exports.deleteProfile = function (req, resp) {
  const { _id } = req.params;
  Profile.delete({ _id }, function(err, profileResp){
    if (err) return handleError(resp, err);
    console.log('Delete success: ', profileResp);
    resp.send({ status: 'success' });
  })
}

exports.updateProfileStatus = function(req, resp) {
  var { _id, status } = req.body;
  Profile.findOneAndUpdate({ _id }, { status }, function(err, profileResp) {
    if (err) return handleError(resp, err);
    console.log('Status Update Success: ', profileResp);
    resp.send({ status: 'success' });
  });
}

exports.updateProfileId = function(req, resp) {
  var { _id, id } = req.body;
  Profile.findOneAndUpdate({ _id }, { id }, function(err, profileResp) {
    if (err) return handleError(resp, err);
    console.log('Profile Id Update Success: ', profileResp);
    resp.send({ status: 'success' });
  });
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {error: err});
}

var Profile = require('./profile.model');
const MatchMap = require('./match-map.model');
var FileUploadService = require('./../../services/fileUploadService');
var Utils = require('./../../services/utils');
const {getMatch} = require("../../services/match-making.service");
const {ALL_SETTLED_RESULTS, astroMatchConfig, MATCH_FAILED} = require("../../services/constants.service");

// const profiles = [[{"key":"id","value":"Id No:- 5671: PROFILE OF (GAJJAR) STUTI ","displayText":"Id"},{"key":"name","value":"(GAJJAR) STUTI ","displayText":"Name"},{"key":"surname","value":"SUTHAR","displayText":"Surname"},{"key":"age","value":"29","displayText":"Age"},{"key":"height","value":"5'-4''","displayText":"Height"},{"key":"weight","value":"70\n      K.G","displayText":"Weight"},{"key":"qualification","value":"M.COM.&nbsp;","displayText":"Qualification"},{"key":"occupation","value":"BANKING SECTOR","displayText":"Occupation"},{"key":"native","value":"UMARETH","displayText":"Native"},{"key":"father","value":"KAMLESHBHAI GAJJAR","displayText":"Father"},{"key":"fatherOccupation","value":"GRAPHICS DESIGNING","displayText":"Father's Occupation"},{"key":"mother","value":"BHARGAVIBEN GAJJAR","displayText":"Mother"},{"key":"motherOccupation","value":"HOUSE WIFE","displayText":"Mother's Occupation"},{"key":"brothers","value":"1","displayText":"Brothers"},{"key":"sisters","value":"0","displayText":"Sisters"},{"key":"familyIncome","value":"2,00,000","displayText":"Family Income"},{"key":"personalIncome","value":"4.00.000","displayText":"Personal Income"},{"key":"birthDate","value":"D.O.B.-&nbsp;\n      4/11/1992","displayText":"Birth Date"},{"key":"birthTime","value":"BIRTH\n      TIME:-12.54 PM","displayText":"Birth Time"},{"key":"birthPlace","value":"BIRTH\n      PLACE:-AHMEDABAD","displayText":"Birth Place"},{"key":"specs","value":"SPECT:-NO","displayText":"Specs"},{"key":"mangalShani","value":"MANGAL/SHANI:-MANGAL","displayText":"Mangal/Shani?"},{"key":"aboutMe","value":"","displayText":"About Me"},{"key":"imageUrl","value":"","displayText":"Image Url"}]];

exports.getPaginatedProfiles = function (req, resp) {
  console.log('getPaginatedProfiles: ');
  Profile.find({ status: true }, { originalImageUrl: 0 }, function(err, profiles){
    if (err) return handleError(resp, err);
    resp.send({ action: 'success', data: profiles });
  })
}

exports.getProfileDetails = function (req, resp) {
  console.log('getProfileDetails: ', req.params);
  const { _id } = req.params;
  Profile.findOne({ _id }, { originalImageUrl: 0 }, function(err, profile) {
    if (err) return handleError(resp, err);
    resp.send({ action: 'success', data: profile });
  });
}

exports.upsertProfile = function (req, resp) {
  var profile = req.body;
  console.log('upsertProfile:');
  const fileName = `${profile.name.replace(' ', '').toLowerCase()}_${Utils.getFileNameFromUrl(profile.originalImageUrl)}`;
  // console.log('fileName: ', fileName);
  FileUploadService.uploadImageByUrl({
    file: profile.originalImageUrl,
    fileName,
  }).then(fileResp => {
    console.log('File upload done: IKUrl: ', fileResp.url);
    profile.imageUrl = fileResp.url;
    Profile.findOneAndUpdate({idText: profile.idText}, profile, {new: true, upsert: true, setDefaultsOnInsert: true}, function(err, profileResp){
      if (err) return handleError(resp, err);
      console.log('Upsert success:');
      resp.send({action: 'success', data: profile.id});
    })
  }).catch(fileErr => {
    console.log('Err @uploadImageByUrl: ', fileErr);
    return handleError(fileErr);
  })
}

exports.hideProfile = function (req, resp) {
  const { _id } = req.params;
  console.log('Hide profile for _id: ', _id);
  Profile.findOneAndUpdate({ _id }, { status: false }, function(err, profileResp) {
    if (err) return handleError(resp, err);
    console.log('Delete success: ', profileResp);
    resp.send({ action: 'success' });
  })
}

exports.deleteProfile = function (req, resp) {
  const { _id } = req.params;
  Profile.delete({ _id }, function(err, profileResp){
    if (err) return handleError(resp, err);
    console.log('Delete success: ', profileResp);
    resp.send({ action: 'success' });
  })
}

exports.updateProfileStatus = function(req, resp) {
  var { _id, connectionStatus } = req.body;
  Profile.findOneAndUpdate({ _id }, { connectionStatus }, function(err, profileResp) {
    if (err) return handleError(resp, err);
    console.log('Status Update Success: ', profileResp);
    resp.send({ action: 'success' });
  });
}

exports.updateProfileId = function(req, resp) {
  var { _id, id } = req.body;
  Profile.findOneAndUpdate({ _id }, { id }, function(err, profileResp) {
    if (err) return handleError(resp, err);
    console.log('Profile Id Update Success: ', profileResp);
    resp.send({ action: 'success' });
  });
}

exports.syncMatches = async (req, resp) => {
  const { profileId } = req.params;
  try {
    const { gender, matchMakingData, id } = await Profile.findOne({ _id: profileId });
    // console.log('Gender: ', gender);
    const filter = gender.toLowerCase() === 'male' ? { maleId: id } : { femaleId: id };
    const alreadyMatchedProfiles = await MatchMap.find(filter);
    console.log('Matches: ', alreadyMatchedProfiles.length);
    const profileFilters = { gender: {$ne: gender} };
    if (alreadyMatchedProfiles?.length) {
      let genderKey = 'maleId';
      if (gender.toLowerCase() === 'male') genderKey = 'femaleId'
      profileFilters['id'] = { $nin: alreadyMatchedProfiles.map(p => p[genderKey]) };
    }
    console.log('ProfileFilters: ', profileFilters);
    const newProfiles = await Profile
      .find(profileFilters)
      // .limit(2)
      .select('_id matchMakingData id');
    // console.log('New Profiles: ', newProfiles.length, newProfiles.map(p => p.id));
    console.log('New Profiles: ', newProfiles.length);
    const matchPromises = newProfiles.map(p => {
      const payload = {};
      if (gender.toLowerCase() === 'male') {
        payload.male = matchMakingData;
        payload.female = p.matchMakingData;
      } else {
        payload.female = matchMakingData;
        payload.male = p.matchMakingData;
      }
      return getMatch(payload);
    })
    const matchResult = await Promise.allSettled(matchPromises);
    const upsertResults = await Promise.allSettled(matchResult.map(({status, reason, value}, i) => {
      // console.log('{status, reason, value}: ', status, reason, value);
      const matchMap = {
        match_score: 0,
        out_of: 0,
        match_output: reason || MATCH_FAILED.OTHER_ISSUES,
        matched_on: new Date(),
        match_config: astroMatchConfig,
      };
      if (gender.toLowerCase() === 'male') {
        matchMap.maleId = id;
        matchMap.femaleId = newProfiles[i]['id'];
      } else {
        matchMap.femaleId = id;
        matchMap.maleId = newProfiles[i]['id'];
      }
      const {maleId, femaleId} = matchMap;
      if (status === ALL_SETTLED_RESULTS.FULFILLED) {
        const { statusCode, output } = value.data;
        if (statusCode === 200) {
          matchMap.match_output = output;
          matchMap.out_of = output.out_of;
          matchMap.match_score = output.total_score;
        } else {
          matchMap.match_output = MATCH_FAILED.API_ISSUE;
        }
      }
      return MatchMap.findOneAndUpdate({maleId, femaleId}, matchMap, {upsert: true}, e => {
        if (e) console.log('Err update: ', maleId, femaleId);
      })
      // return matchMap;
    }));

    // const upsertResults = [];
    const failed = upsertResults.filter(p => p?.status === ALL_SETTLED_RESULTS.REJECTED);
    if (!failed.length) {
      console.log('All records updated: ');
    } else {
      console.log('Some/All update failed: ', failed);
    }
    resp.send({ status: failed.length ? 'Some/All update failed' :'success' });
  } catch (e) {
    console.log('Err @syncMatches: ', e);
    handleError(resp, e)
  }
}

exports.getMatchDetails = async (req, resp) => {
  const { profileId } = req.params;
  try {
    const { gender, id } = await Profile.findOne({ _id: profileId });
    let genderKey = 'femaleId';
    const matchFilters = {};
    if (gender.toLowerCase() === 'male') genderKey = 'maleId'
    matchFilters[genderKey] = id;
    const matchMaps = await MatchMap
      .find(matchFilters)
      .select('maleId femaleId matched_on match_score out_of')
      .sort({match_score: 'desc'});
    console.log('matchMaps: ', matchMaps.length);
    resp.send({ status: 'success', data: matchMaps })
  } catch (e) {
    console.log('Err @getMatchDetails: ', e);
    handleError(resp, e)
  }
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}

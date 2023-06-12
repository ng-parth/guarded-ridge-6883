var Profile = require('./profile.model');
const MatchMap = require('./match-map.model');
var FileUploadService = require('./../../services/fileUploadService');
var Utils = require('./../../services/utils');
const {getMatch} = require("../../services/match-making.service");
const {ALL_SETTLED_RESULTS, astroMatchConfig, MATCH_FAILED} = require("../../services/constants.service");

// const profiles = [[{"key":"id","value":"Id No:- 5671: PROFILE OF (GAJJAR) STUTI ","displayText":"Id"},{"key":"name","value":"(GAJJAR) STUTI ","displayText":"Name"},{"key":"surname","value":"SUTHAR","displayText":"Surname"},{"key":"age","value":"29","displayText":"Age"},{"key":"height","value":"5'-4''","displayText":"Height"},{"key":"weight","value":"70\n      K.G","displayText":"Weight"},{"key":"qualification","value":"M.COM.&nbsp;","displayText":"Qualification"},{"key":"occupation","value":"BANKING SECTOR","displayText":"Occupation"},{"key":"native","value":"UMARETH","displayText":"Native"},{"key":"father","value":"KAMLESHBHAI GAJJAR","displayText":"Father"},{"key":"fatherOccupation","value":"GRAPHICS DESIGNING","displayText":"Father's Occupation"},{"key":"mother","value":"BHARGAVIBEN GAJJAR","displayText":"Mother"},{"key":"motherOccupation","value":"HOUSE WIFE","displayText":"Mother's Occupation"},{"key":"brothers","value":"1","displayText":"Brothers"},{"key":"sisters","value":"0","displayText":"Sisters"},{"key":"familyIncome","value":"2,00,000","displayText":"Family Income"},{"key":"personalIncome","value":"4.00.000","displayText":"Personal Income"},{"key":"birthDate","value":"D.O.B.-&nbsp;\n      4/11/1992","displayText":"Birth Date"},{"key":"birthTime","value":"BIRTH\n      TIME:-12.54 PM","displayText":"Birth Time"},{"key":"birthPlace","value":"BIRTH\n      PLACE:-AHMEDABAD","displayText":"Birth Place"},{"key":"specs","value":"SPECT:-NO","displayText":"Specs"},{"key":"mangalShani","value":"MANGAL/SHANI:-MANGAL","displayText":"Mangal/Shani?"},{"key":"aboutMe","value":"","displayText":"About Me"},{"key":"imageUrl","value":"","displayText":"Image Url"}]];

const mainKey = '_id';

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
    const profile = await Profile.findOne({ _id: profileId });
    const { matchMakingData } = profile;
    const mainKeyValue = `${profile[mainKey]}`;
    const {gender, otherGender, genderKey, otherGenderKey} = Utils.getGenderKeys(profile.gender);
    const filter = {};
    filter[genderKey] = mainKeyValue;
    const alreadyMatchedProfiles = await MatchMap.find(filter);
    console.log('Matches: ', alreadyMatchedProfiles.length);
    const profileFilters = { gender: {$ne: gender} };
    if (alreadyMatchedProfiles?.length) {
      profileFilters[mainKey] = { $nin: alreadyMatchedProfiles.map(p => p[otherGenderKey]) };
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
      payload[gender.toLowerCase()] = matchMakingData;
      payload[otherGender.toLowerCase()] = p.matchMakingData;
      return getMatch(payload);
    })
    const matchResult = await Promise.allSettled(matchPromises);
    const upsertResults = await Promise.allSettled(matchResult.map(({status, reason, value}, i) => {
      // console.log('{status, reason, value}: ', status, reason, value);
      const matchMap = {
        matchScore: 0,
        outOf: 0,
        matchOutput: reason || MATCH_FAILED.OTHER_ISSUES,
        matchedOn: new Date(),
        matchConfig: astroMatchConfig,
      };
      matchMap[genderKey] = mainKeyValue;
      matchMap[otherGenderKey] = newProfiles[i][mainKey];
      const {maleId, femaleId} = matchMap;
      if (status === ALL_SETTLED_RESULTS.FULFILLED) {
        const { statusCode, output } = value.data;
        if (statusCode === 200) {
          matchMap.matchOutput = output;
          matchMap.outOf = output.out_of;
          matchMap.matchScore = output.total_score;
        } else {
          matchMap.matchOutput = MATCH_FAILED.API_ISSUE;
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
    const profile = await Profile.findOne({ _id: profileId });
    const mainKeyValue = `${profile[mainKey]}`;
    const {gender, genderKey } = Utils.getGenderKeys(profile.gender);
    const matchFilters = {};
    matchFilters[genderKey] = mainKeyValue;
    console.log('Keys: ', gender, matchFilters);
    const matchMaps = await MatchMap
      // .find(matchFilters)
      .aggregate([
        { $match: matchFilters },
        {
          $lookup: {
            from: "profiles", // collection name in db
            localField: "maleId",
            foreignField: "id",
            as: "maleDetails",
          },
        }, {
          $lookup: {
            from: "profiles", // collection name in db
            localField: "femaleId",
            foreignField: "id",
            as: "femaleDetails",
          },
        },
        {
          $project: {
            maleId: 1,
            femaleId: 1,
            matchedOn: 1,
            matchScore: 1,
            outOf: 1,
            maleDetails: { id: 1, _id: 1, name: 1, surname: 1 },
            femaleDetails: { id: 1, _id: 1, name: 1, surname: 1 },
          }
        },
        { $sort : { matchScore: -1 }},
      ])
    // .select('maleId femaleId matched_on match_score out_of maleDetails femaleDetails')
    // .sort({match_score: 'desc'});
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

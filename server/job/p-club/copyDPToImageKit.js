var jobRunner = require('./../job-runner');
var Profile = require('./../../api/p-club/profile.model');
const FileUploadService = require("../../services/fileUploadService");
const Utils = require("../../services/utils");

const startProcess = async () => {
  let profiles = await Profile.find({ }, function(err, profiles) {
    if (err) return console.log('Err @find: ', err);
  });
  console.log('Profiles: ', profiles.length);
  const copyAndUpdatePromises = profiles.map(p => {
    if (!p.originalImageUrl) {
      const originalImageUrl = p.imageUrl;
      const fileName = `${p.name.replace(' ', '').toLowerCase()}_${Utils.getFileNameFromUrl(originalImageUrl)}`;
      const options = {
        file: originalImageUrl,
        fileName,
        folder: '/profiles/dp',
      }
      return FileUploadService.uploadImageByUrl(options).then(({ url: imageUrl }) => {
        const profile = { originalImageUrl, imageUrl };
        return Profile.updateOne(
          {_id: p._id},
          profile,
          {new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: true }
        );
      }).catch(error => {
        console.log('Err copy image: ', p.idText, error);
        return Promise.reject({ error });
      })
    } else {
      return Promise.resolve(true);
    }
  });
  const allUpdateResp = await Promise.allSettled(copyAndUpdatePromises);
  console.log('All Settled: Done');
  const failed = allUpdateResp.filter(p => p.status === 'rejected');
  if (!failed.length) {
    console.log('All records updated: ');
  } else {
    console.log('Some/All update failed: ', failed);
  }
}

jobRunner('copyDpToImageKit', startProcess);

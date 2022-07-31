var ImageKit = require("imagekit");
// require('dotenv').config();

var imagekit = new ImageKit({
  publicKey : process.env.IMK_PBL_KEY,
  privateKey : process.env.IMK_PVT_KEY,
  urlEndpoint : process.env.IMK_URL
});

const uploadImageByUrl = uploadOptions => {
  // console.log('uploadOptions: ',  uploadOptions);
  if (!uploadOptions.file || !uploadOptions.fileName)
    return Promise.reject({ message: 'File and/or FileName not present.' });
  const { useUniqueFileName = false, folder = '/profiles/dp' } = { ...uploadOptions };
  const fileOptions = {
    ...uploadOptions,
    useUniqueFileName,
    folder,
  }
  console.log('Uploading image: ',  uploadOptions.file);
  return imagekit.upload(fileOptions).then(
    resp => {
      console.log("Image Upload Success. New Url: ", resp.url);
      return Promise.resolve(resp);
    }).catch(err => {
    console.log("Image Upload Failed: ", err);
    return Promise.reject(err);
  });
};

const FileUploadService = { uploadImageByUrl };
module.exports = FileUploadService;

  // imagekit.upload({
  //   file : "http://panchalclub.com/fuploaded/4970.jpg",
  //   fileName : "MAHESHWARI_PANCHAL_4970.jpg",
  //   useUniqueFileName: false,
  // })

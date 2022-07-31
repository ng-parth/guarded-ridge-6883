var ImageKit = require("imagekit");
require('dotenv').config();

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
  return imagekit.upload(fileOptions);
};

const FileUploadService = { uploadImageByUrl };
module.exports = FileUploadService;

  // imagekit.upload({
  //   file : "http://panchalclub.com/fuploaded/4970.jpg",
  //   fileName : "MAHESHWARI_PANCHAL_4970.jpg",
  //   useUniqueFileName: false,
  // })

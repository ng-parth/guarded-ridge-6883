if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
var mongoose = require('mongoose');
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/guarded-ridge-dev';


async function disconnectMongo() {
  await mongoose.disconnect().catch(err => {
    console.log('Err closing db conn.: ', err);
  }).then(resp => {
    console.log('Connection closed: Exiting process');
    process.exit();
  });
}

async function connectMongo(jobName, jobFunction) {
  console.log('Starting job: ', jobName);
  return await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log('Connection Failed: ', {mongoUrl, err})
  }).then(async () => {
    console.log('Connected to: ', mongoUrl);
    try {
      await jobFunction();
      console.log('Finished job: ', jobName);
      await disconnectMongo();
    } catch (e) {
      console.log(`Err @${jobName}: `, e);
      await disconnectMongo();
    }
  });
}

module.exports = connectMongo;



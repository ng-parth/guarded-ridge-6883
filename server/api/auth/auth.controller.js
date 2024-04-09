/**
 * Created by parth on 14/7/2023.
 */

const {OAuth2Client} = require("google-auth-library");
const axios = require('axios');

exports.verifyGoogleUser = function(req, res) {
  //Some Logic:
  const client = new OAuth2Client(process.env.GOOGLE_APP_AUTH_ID);
  const idToken = req?.body?.credential;
  if (idToken) {
    client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID
    }).then(ticket => {
      res.send({ user: ticket.getPayload(), status: 'success' });
    });
  } else {
    res.send(500, { status: 'failure', errorMsg: 'Invalid Google User Token.' });
  }
};

exports.verifyGoogleUserImplicit = function(req, res) {
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
  );
  // const client = new OAuth2Client(process.env.GOOGLE_APP_AUTH_ID);
  const {code} = req?.body;
  if (code) {
    client.getToken(code).then(({ tokens }) => {
      console.log('Tokesn: ', tokens);
      axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokens.access_token}` } },
      ).then(({data : userInfo}) => {
        debugger
        console.log("userInfo: " , userInfo);
        res.send({ userInfo, status: 'success' });
      });
      
    }).catch(err => {
      console.log('err: ', err);
      res.send(500, { status: 'failure', errorMsg: 'Invalid Google Auth Code.' });  
    });
  } else {
    res.send(500, { status: 'failure', errorMsg: 'Invalid Google User Token.' });
  }
}

const axios = require("axios");
const {astroMatchConfig} = require("./constants.service");

const getMatch = payload => {
  const apikey = process.env.ASTRO_API_KEY;
  return axios.post(
    'https://json.freeastrologyapi.com/match-making/ashtakoot-score',
    { ...payload, config: astroMatchConfig },
    { headers: { 'Content-Type': 'application/json', 'x-api-key': apikey } },
  );
}

module.exports = {
  getMatch,
}

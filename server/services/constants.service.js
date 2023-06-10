const astroMatchConfig = {
  observation_point: 'topocentric',
  language: 'en',
  ayanamsha: 'lahiri',
};

const ALL_SETTLED_RESULTS = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};

const MATCH_FAILED = {
  API_ISSUE: 'Match failed due to astro issues.',
  OTHER_ISSUES: 'Match failed due to unknown reasons.'
}

module.exports = {
  astroMatchConfig,
  ALL_SETTLED_RESULTS,
  MATCH_FAILED,
}

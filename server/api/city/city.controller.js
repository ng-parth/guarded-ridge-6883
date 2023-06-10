/**
 * Created by Parth Mistry on 2023-06-08.
 */

var City = require('./city.model');

exports.get = function (req, res) {
  return City.find({});
};

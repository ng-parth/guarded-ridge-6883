/**
 * Created by Parth Mistry on 2023-06-07.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CitySchema = new Schema({
  city: String,
  city_ascii: String,
  lat: String,
  lng: String,
  country: String,
  iso2: String,
  iso3: String,
  admin_name: String,
  capital: String,
  population: Number,
  id: Number,
});

module.exports = mongoose.model('City', CitySchema, 'world_city');

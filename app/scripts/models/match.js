var Backbone = require('backbone');

var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;

var Match = ParseModel.extend({
  urlRoot: 'https://futbol-finder.herokuapp.com/classes/Matches'

});

var MatchCollection = ParseCollection.extend({
  model: Match,
  baseUrl: 'https://futbol-finder.herokuapp.com/classes/Matches'
});

module.exports = {
  Match,
  MatchCollection
}

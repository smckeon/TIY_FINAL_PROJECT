var Backbone = require('backbone');

var ParseModel = require('./parse').ParseModel;

var Match = ParseModel.extend({
  urlRoot: 'https://futbol-finder.herokuapp.com/classes/Matches'

});

var MatchCollection = Backbone.Collection.extend({
  model: Match,
  url: 'https://futbol-finder.herokuapp.com/classes/Matches'
});

module.exports = {
  Match,
  MatchCollection
}

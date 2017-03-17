var Backbone = require('backbone');

var ParseFile = Backbone.Model.extend({
  urlRoot: function(){
    return "https://futbol-finder.herokuapp.com/files/" + this.get('name');
  }
});

module.exports = {
  ParseFile
};

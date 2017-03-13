var $ = require('jquery');
var Backbone = require('backbone');

require('./router');
require('./utilities');

$(function(){
  Backbone.history.start();
})

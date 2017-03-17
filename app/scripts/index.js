var $ = require('jquery');
var Backbone = require('backbone');

require('./router');
require('./parse');

$(function(){
  Backbone.history.start();
})

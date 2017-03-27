var Backbone = require('backbone');

var Attendee = Backbone.Model.extend{


};


var AttendeeCollection = Backbone.Collection.extend{
  model: Attendee,
  url: ''
}

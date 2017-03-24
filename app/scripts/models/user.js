var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../parse');
var ParseModel = require('./parse').ParseModel;

var User = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: function(){
    return parse.BASE_API_URL + '/users';
  }
}, {
  login: function(creds, callback){
    var url = parse.BASE_API_URL + '/login?' + $.param(creds);
    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
  },
  retrieveImage: function(objectId){
    var url = parse.BASE_API_URL + '/users/' + objectId;
    var image =  $.get(url).done(user => {
      return user.imageUrl;
    });
    return image
  },
  signup: function(creds, callback){
    var newUser = new User(creds);
    newUser.save().then(() => {
      User.store(newUser);
      callback(newUser);
    });
  },
  logout: function(){
    var url = parse.BASE_API_URL + '/logout';
    $.post(url).then(event=>{
      localStorage.clear('user');
      console.log('parse user logged out');
    })
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  currentUser: function(){
    var user = localStorage.getItem('user');
    if(!user){
     return false;
    }

    var currentUser = new User(JSON.parse(user));

   if(!currentUser.get('sessionToken')){
     return false;
    }
    return currentUser;
  }
});

module.exports = {
  User
}

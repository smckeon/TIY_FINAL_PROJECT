var Backbone = require('backbone');
var $ = require('jquery');

var parse = require('../parse');

var User = Backbone.Model.extend({
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
      console.log('parse user logged out');
    })
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  currentUser: function(){
    var user = localStorage.getItem('user');
    console.log(user);
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

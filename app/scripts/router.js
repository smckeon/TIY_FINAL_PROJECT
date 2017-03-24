// Requiring in the libraries which will be used in this page
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Importing our Smart components
var AuthContainer = require('../scripts/components/auth.jsx');
var WelcomeContainer = require('../scripts/components/user_home.jsx');
var HomeContainer = require('../scripts/components/home.jsx');
var AccountInfoContainer = require('../scripts/components/account_info.jsx');
var CreateMatch = require('../scripts/components/create_match.jsx');

// Importing our User Model
var User = require('./models/user').User;

// Importing Parse file so the router can communicate with our Parse Server
var parse = require('./parse');

// Creating initial routes for the app to navigate to
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'auth': 'auth',
    'home': 'userHome',
    'account': 'accountInfo',
    'create': 'createMatch',
    'matches': 'matchListing'
  },
  // Initializing a user who will be logged in
  initialize: function(){
   var user = User.currentUser();

   if(user){
    //  If user is logged in, create a session token to store their info
     parse.setup({
       sessionId: user.get('sessionToken'),
       BASE_API_URL: 'https://futbol-finder.herokuapp.com'
     });
   } else {
     parse.setup({
       BASE_API_URL: 'https://futbol-finder.herokuapp.com'
     });
   }

 },

   execute: function(callback, args, name) {
    var user = User.currentUser();

    if(!user) {
      if(['index','auth'].indexOf(name) === -1){
        this.navigate('', { trigger: true });
        return false;
      }
    }

    return Backbone.Router.prototype.execute.apply(this, arguments);
  },

 // Using React to render our route components
  index(){
    ReactDOM.render(
      React.createElement(HomeContainer),
      document.getElementById('app')
    )
  },

  auth(){
    ReactDOM.render(
      React.createElement(AuthContainer, {router: this}),
      document.getElementById('app')
    )
  },

  userHome(){
    ReactDOM.render(
      React.createElement(WelcomeContainer),
      document.getElementById('app')
    )
  },

  accountInfo(){
    ReactDOM.render(
      React.createElement(AccountInfoContainer),
      document.getElementById('app')
    )
  },

  createMatch(){
    ReactDOM.render(
      React.createElement(CreateMatch),
      document.getElementById('app')
    )
  },

  matchListing(){

  },

});

// Instantiating router - AKA 'turning on' the router
var appRouter = new AppRouter();

// Exporting the router so it can be linked to index.js
module.exports = {
  appRouter
}

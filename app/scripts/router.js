var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');


var AuthContainer = require('../scripts/components/auth.jsx');
var WelcomeContainer = require('../scripts/components/user_home.jsx');
var HomeContainer = require('../scripts/components/home.jsx');
var AccountInfoContainer = require('../scripts/components/account_info.jsx');
var CreateMatch = require('../scripts/components/create_match.jsx');

var User = require('./models/user').User;

var parse = require('./parse');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'auth': 'auth',
    'home': 'userHome',
    'account': 'accountInfo',
    'create': 'createMatch',
    'games': 'gamesListing',
  },
  initialize: function(){
   var user = User.currentUser();

   if(user){
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

  gamesListing(){

  },

});

var appRouter = new AppRouter();

module.exports = {
  appRouter
}

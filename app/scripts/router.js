var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');


var AuthContainer = require('../scripts/components/auth.jsx').AuthContainer;
var WelcomeContainer = require('../scripts/components/user_home.jsx').WelcomeContainer;
var HomeContainer = require('../scripts/components/home.jsx').HomeContainer;
var AccountInfoContainer = require('../scripts/components/account_info.jsx').AccountInfoContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'auth': 'auth',
    'home': 'userHome',
    'account': 'accountInfo',
    'create': 'createMeetup',
    'games': 'gamesListing',
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

  createMeetup(){

  },

  gamesListing(){

  },

});

var appRouter = new AppRouter();

module.exports = {
  appRouter
}

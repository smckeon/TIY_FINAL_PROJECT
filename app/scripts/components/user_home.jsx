var $ = require('jquery');
var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');
var MatchListing = require('./match_listing.jsx');
var User = require('../models/user').User;

var API_KEY = require('.././api_key').API_KEY;
// ^^ ? Hiding API KEY

class WelcomeContainer extends React.Component {
  componentWillMount(){

    $.ajax({
      url: 'https://api.meetup.com/find/groups?key=' + API_KEY + '&zip=28105&radius=10&keywords="soccer"&order=members',
      dataType: 'jsonp'
    }).done(function(data){
      console.log('data', data);
    })
  }
  render(){
    return(
    <BaseLayout>
        <div className="well">
          <div className="container">
            <h2>Match Browser for {User.currentUser() ? User.currentUser().get('name') : User.currentUser().get('username')}   </h2>
            <h4>Current games are listed below. If no games are listed, create one!</h4>
          </div>
        </div>
        <MatchListing />

    </BaseLayout>
    )
  }
};


module.exports = WelcomeContainer;

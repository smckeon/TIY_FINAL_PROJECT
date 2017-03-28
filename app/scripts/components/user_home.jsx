var $ = require('jquery');
var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');
var MatchListing = require('./match_listing.jsx');
var User = require('../models/user').User;


class WelcomeContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
    <BaseLayout>
        <div className="well user_welcome">
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

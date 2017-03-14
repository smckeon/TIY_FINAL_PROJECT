var $ = require('jquery');
var React = require('react');

// var BaseLayout = require('../layouts/baselayout.jsx');

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
      <div>
        <h1>You have arrived at the user welcome/home page</h1>
      </div>
    )
  }

};

module.exports = {
  WelcomeContainer
}

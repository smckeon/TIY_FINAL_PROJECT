var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone')

var BaseLayout = require('./layouts/baselayout.jsx');
var Match = require('../models/match').Match;
var MatchCollection = require('../models/match').MatchCollection;
var User = require('../models/user').User;

const SERVER_URL = "http://localhost:3000";

class CreateMatch extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      date: null,
      time: null,
      address: null,
      description: null
    }

    this._createMatch = this._createMatch.bind(this);
    this._handleDate = this._handleDate.bind(this);
    this._handleTime = this._handleTime.bind(this);
    this._handleAddress = this._handleAddress.bind(this);
    this._handleDescription = this._handleDescription.bind(this);

  }

  _handleDate(e) {
    this.setState({'date': e.target.value});
  }

  _handleTime(e) {
    this.setState({'time': e.target.value});
  }

  _handleAddress(e) {
    this.setState({'address': e.target.value})
  }

  _handleDescription(e) {
    this.setState({'description': e.target.value})
  }

  _createMatch() {
    var user = User.currentUser();
    var match = new Match(this.state);
    var newDate = new Date(this.state.date + ' ' + this.state.time);

    var dateParse = {
      "__type" : "Date",
      "iso" : newDate
    };

    match.set('date',  dateParse );
    match.setPointer('owner', '_User', user.get('objectId'));

    match.save().then(function() {
      Backbone.history.navigate('/home', {trigger: true});
    });

  }



  render(){
    return(
      <BaseLayout>
          <div className="container">
            <div className="match-template col-md-push-3 col-md-6">
              <div className="thumbnail">
                <div className="caption">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input onChange={this._handleDate} type="date" className="form-control" id="date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Time</label>
                    <input onChange={this._handleTime} type="time" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Address</label>
                    <input value={this.state.address} onChange={this._handleAddress} type="text" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Match Description:</label>
                    <textarea value={this.state.description} onChange={this._handleDescription} className="form-control" rows="4" id="description"></textarea>
                  </div>

                    <a className="btn btn-success center-block" role="button" onClick={this._createMatch} >Create Match</a>
                  </div>
                </div>
              </div>
            </div>
          <div className="row" />
      </BaseLayout>
    )
  }

};

module.exports = CreateMatch;

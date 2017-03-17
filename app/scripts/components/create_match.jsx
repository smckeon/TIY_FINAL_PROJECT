var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');
var Match = require('../models/match').Match;
var User = require('../models/user').User;

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

    var date = new Date(e.target.value);

    var dateParse = {
      "__type" : "Date",
      "iso" : date
    }

    this.setState({'date': dateParse})
  }

  _handleTime(e) {


  }

  _handleAddress(e) {
    this.setState({'address': e.target.value})
  }

  _handleDescription(e) {
    this.setState({'description': e.target.value})
  }

  _createMatch() {
    var match = new Match(this.state);
    var user = User.currentUser();

    match.setPointer('owner', '_User', user.get('objectId'));

    match.save().then(function() {
      console.log('match', match);
    });

  }
  render(){
    return(
      <BaseLayout>
          <div className="container">
            <div className="game-template col-md-6">
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

                    <a className="btn btn-primary" role="button" onClick={this._createMatch} >Create Match</a>
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

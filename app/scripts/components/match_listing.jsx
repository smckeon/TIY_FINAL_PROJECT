var React = require('react');
var moment = require('moment');
var User = require('../models/user').User;
var MatchCollection = require('../models/match').MatchCollection;



class MatchListing extends React.Component {
  constructor(props){
    super(props);

    var matchCollection = new MatchCollection();

    this.state = {
      matchCollection: matchCollection
    }

    matchCollection.fetch().done((response)=> {

      this.setState({matchCollection : matchCollection});

    });
  }
  render(){

    return(
      <div>
        <div className="container">
          <div className="match-listing col-md-4">
            <div className="thumbnail">
              { this.state.matchCollection.length != 0 ? <MatchListingModal collection={ this.state.matchCollection }/> : null }
              <MatchInfo matchCollection={this.state.matchCollection}/>
              </div>
            </div>
          </div>
        <div className="row">
      </div>
    </div>
    )
  }
};

class MatchListingModal extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      image: "http://placehold.it/250x250"
    }
  }

  render(){

    var user = User.retrieveImage(this.props.collection.models[0].get('owner').objectId).then((response)=>{
      this.setState({image: response.imageUrl});
    });

    return(
<div>
      <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src={ this.state.image } /></a>
      <p className="text-center">Click on image to view who's going!</p>

      <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-md">
              <div className="modal-content bio-modal">
                  <div className="col-sm-12 col-md-3">
                      <img src={ this.state.image } />
                  </div>
                  <div className="col-sm-12 col-md-9">
                      <h1>Players Attending:</h1>
                      <ul>
                        <li>Listing of attending players by username.</li>
                      </ul>
                  </div>
                  <button type="button" className="btn btn-secondary center-block" data-dismiss="modal">X</button>
              </div>
          </div>
      </div>
</div>
)
  }
};

class MatchInfo extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
      var matches = this.props.matchCollection.map((match) => {
        console.log('match', match);
        console.log(match.get("time").iso);
        return (
          <div key={match.cid}>
            <h5>{moment(match.get("date").iso).format('LL') + " at " + moment(match.get("time").iso).format('LT')}</h5>
            <h5>{match.get("address")}</h5>
            <p>{match.get("description")}</p>
          </div>
        )
      })
    return (
      <div className="caption text-center">
          {matches}


          <a href="#/home" className="btn btn-success text-right" role="button">Going!</a>
        </div>
    )
  }
}

module.exports = MatchListing;

var React = require('react');
var moment = require('moment');
var User = require('../models/user').User;
var MatchCollection = require('../models/match').MatchCollection;

  // { this.state.matchCollection.length != 0 ? <MatchListingModal collection={ this.state.matchCollection }/> : null }

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
    var matches;
    var matchCollection = this.state.matchCollection;

    if (matchCollection.length != 0) {
      matches = matchCollection.map(function(match){
        return (
          <MatchInfo key={match.cid} match={match}/>
        )
      })
    }

    return(
      <div>
        <div className="container">

              { matches }

          </div>
        <div className="row">
      </div>
    </div>
    )
  }
};

class MatchInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: "http://placehold.it/250x200"
    }
    this.deleteMatch = this.deleteMatch.bind(this);
  }

  deleteMatch(model) {
    model.destroy();
    {/*this.forceUpdate();*/}
  }

  render(){

    console.log('props',moment(this.props.match.get("date").iso).format('LT'));

    var userId = User.currentUser().get('objectId');
    var modelOwnerId = this.props.match.get('owner').objectId;

    var deleteAccess = userId == modelOwnerId ? true : false;


    return (
  <div className="match-listing col-md-4">
  <div className="well">
    {deleteAccess ? <i className="fa fa-trash" id="delete_match" aria-hidden="true" onClick={(e) => this.deleteMatch(this.props.match)}/> : null}
    <br />
    <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src= { this.state.image } className="center-block" /></a>
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
    <div className="well user_listing">
      <div className="caption text-center">
        <div className="match_dynamic_details">
        <div key={this.props.match.cid}>
          <h5>{moment(this.props.match.get("date").iso).format('LL') + " on " + moment(this.props.match.get("date").iso).format("dddd, h:mm")}</h5>
          <h5>{this.props.match.get("address")}</h5>
          <p>{this.props.match.get("description")} </p>
        </div>
        </div>
        <input type='button' className="btn btn-success text-right" value="Going!" />

        </div>
      </div>
    </div>
  </div>
    )
  }
}
// class MatchListingModal extends React.Component{
//   constructor(props){
//     super(props);
//
//     this.state = {
//       image: "http://placehold.it/250x250"
//     }
//   }
//
//   render(){
//
//     var user = User.retrieveImage(this.props.collection.models[0].get('owner').objectId).then((response)=>{
//       this.setState({image: response.imageUrl});
//     });
//
//     return(
// <div>
//       <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src={ this.state.image } /></a>
//       <p className="text-center">Click on image to view who's going!</p>
//
//       <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
//           <div className="modal-dialog modal-md">
//               <div className="modal-content bio-modal">
//                   <div className="col-sm-12 col-md-3">
//                       <img src={ this.state.image } />
//                   </div>
//                   <div className="col-sm-12 col-md-9">
//                       <h1>Players Attending:</h1>
//                       <ul>
//                         <li>Listing of attending players by username.</li>
//                       </ul>
//                   </div>
//                   <button type="button" className="btn btn-secondary center-block" data-dismiss="modal">X</button>
//               </div>
//           </div>
//       </div>
// </div>
// )
//   }
// };



module.exports = MatchListing;

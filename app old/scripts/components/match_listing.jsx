var $ = require('jquery');
var React = require('react');
var moment = require('moment');
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;
var MatchCollection = require('../models/match').MatchCollection;

  // { this.state.matchCollection.length != 0 ? <MatchListingModal collection={ this.state.matchCollection }/> : null }

  class MatchListing extends React.Component {
   constructor(props){
     super(props);

     var userCollection = new UserCollection();
     var matchCollection = new MatchCollection();

     this.state = {
       matchCollection,
       userCollection
     }

     matchCollection.parseInclude('owner').fetch().done((response)=> {
       this.setState({matchCollection : matchCollection});
     });
     this._sendSMS = this._sendSMS.bind(this);
     this.deleteMatch = this.deleteMatch.bind(this);
   }

   deleteMatch(model) {
     var collection = this.state.matchCollection;
     collection.remove(model);
     this.setState({ matchCollection: collection });
     model.destroy();
   }

   _sendSMS(model) {
     console.log('model', model);
     // do not use jquery on this page
     // $.get(`${SERVER_URL}/sms`, { number: '+18032074719'}).done(response => {
     //   console.log('message sent successfully', response);
     // });
   }

   _addAttendee(model) {
     var match = model;
     var userId = User.currentUser().get('objectId');
     match.addAttendee(User.currentUser().get('objectId'));
   }


   render(){
     var matches;
     var matchCollection = this.state.matchCollection;

     if (matchCollection.length != 0) {
       matches = matchCollection.map((match) => {

         return (
           <MatchInfo key={match.cid} match={match} _sendSMS={this._sendSMS} deleteMatch={this.deleteMatch} _addAttendee={this._addAttendee}/>
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

  }

  componentDidMount() {
    var ownerImage = this.props.match.get('owner').imageUrl
    if(ownerImage){
      this.setState({image: ownerImage})
    };
  }

  render(){
   var currentUserId = User.currentUser().get('objectId');
   var modelOwnerId = this.props.match.get('owner').objectId;
   var deleteAccess = currentUserId == modelOwnerId ? true : false;

   var deleteIcon = <i className="fa fa-trash" id="delete_match" aria-hidden="true" onClick={(e) => this.props.deleteMatch(this.props.match)}/>

   var contactIcon = <button onClick={(e) => this.props._sendSMS(this.props.match)}>Send Message</button>

   return (
   <div className="match-listing col-md-4">
   <div className="well">
     { deleteAccess ? <div> {deleteIcon} {contactIcon} </div> : null }
   <br />

   <a data-toggle="modal" data-target={'.bs-example-modal-lg' + this.props.match.cid}><img src= { this.state.image } className="center-block" /></a>
   <p className="text-center">Click on image to view who's going!</p>

   <div className={'modal fade bs-example-modal-lg' + this.props.match.cid} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
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
       <input onClick={(e) => this.props._addAttendee(this.props.match)} type='button' className="btn btn-success text-right" value="Going!" />

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

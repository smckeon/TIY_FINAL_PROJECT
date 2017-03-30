var $ = require('jquery');
var React = require('react');
var moment = require('moment');
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;
var MatchCollection = require('../models/match').MatchCollection;

const SERVER_URL = "http://localhost:3000";


  // on submit set an empty array to going on create match
  // owner still a pointer
  // console log matchcollection in render

  class MatchListing extends React.Component {
   constructor(props){
     super(props);

     var userCollection = new UserCollection();
     var matchCollection = new MatchCollection();

     this.state = {
       matchCollection,
       userCollection
     }

     matchCollection.parseInclude('owner,going').fetch().done((response)=> {
       this.setState({matchCollection : matchCollection});
     });
     this._sendSMS = this._sendSMS.bind(this);
     this.deleteMatch = this.deleteMatch.bind(this);
     this.generateAttendeesList = this.generateAttendeesList.bind(this);
     this._addAttendee = this._addAttendee.bind(this);
   }

   deleteMatch(model) {
     var collection = this.state.matchCollection;
     collection.remove(model);
     this.setState({ matchCollection: collection });
     model.destroy();
   }

   _sendSMS(match) {
     console.log('match', match);

     var message = {
       description: match.get('description'),
       address: match.get('address'),
       date: moment(match.get('date').iso).format('LL'),
       time: moment(match.get('date').iso).format("dddd, h:mm")
     }
    // CODE THAT NEEDS TO RUN IF SENDING TO ACTUAL USERS; FORMAT USER NUMBER TO BE CORRECT FORMAT FOR TWILIO
     // TEST CODE THAT WILL SEND A TEST MESSAGE TO END USER

     $.get(`${SERVER_URL}/sms`, { number: '+18032074719', message: message }).done(response => {
       console.log('message', message);
       console.log('message sent successfully', response);
     });
   }

   generateAttendeesList(match) {
     var going = match.get('going');
     return going.map(function(user){
       return(
         <li key={match.objectId}>{match.get('name')}</li>
        )
     })
   }

   _addAttendee(model) {
     var match = model;
     var userId = User.currentUser().get('objectId');
     var matchCollection = new MatchCollection();
     match.addAttendee(User.currentUser().get('objectId'));

     if (match.get('going')){
     match.get('going').push({"__type":"Pointer","className":"_User","objectId":userId})
    }else{
     // if undefined set to array type then push
      match.set({'going': []}).push({"__type":"Pointer","className":"_User","objectId":userId})
    }

    match.save().then(()=>{
      matchCollection.parseInclude('owner,going').fetch().done((response)=> {
        this.setState({matchCollection : matchCollection});
      });
    })
}

   render(){
     var matches;
     var matchCollection = this.state.matchCollection;
    //  console.log('hey you', matchCollection);

     if (matchCollection.length != 0) {
      matches = matchCollection.map((match) => {
        var attendeeList = this.generateAttendeesList(match);
        // console.log('attendee list', match);
     // map each user that is going to each event, inside the map of each event
         return (
           <MatchInfo key={match.cid} match={match} _sendSMS={this._sendSMS} deleteMatch={this.deleteMatch} _addAttendee={this._addAttendee} match={match}/>
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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  componentDidMount() {
    var ownerImage = this.props.match.get('owner').imageUrl
    if(ownerImage){
      this.setState({image: ownerImage})
    };
  }

  render(){
    var attendees = this.props.match.get('going').map(function(user, index){
      console.log('user', user);
        return (
          <li key={index}>{user.name}</li>
        )
    });

    console.log('peoples', this.props.match);

   var currentUserId = User.currentUser().get('objectId');
   var modelOwnerId = this.props.match.get('owner').objectId;
   var deleteAccess = currentUserId == modelOwnerId ? true : false;


   var deleteIcon = <i className="fa fa-times fa-2x" id="delete_match" aria-hidden="true" onClick={(e) => this.props.deleteMatch(this.props.match)} />

   var contactIcon = <i className="fa fa-mobile fa-3x" id="text_alert" aria-hidden="true" onClick={(e) => this.props._sendSMS(this.props.match)} />

   return (
   <div className="match-listing col-sm-6 col-md-4">
   <div className="well">
    { deleteAccess ? <div className='icon alert-icon'> {contactIcon} </div> : null }
    { deleteAccess ? <div className='icon delete-icon'> {deleteIcon} </div> : null }

   <a data-toggle="modal" data-target={'.bs-example-modal-lg' + this.props.match.cid}><img src= { this.state.image } className="center-block match_photo" /></a>
   <p className="text-center">Click on image to view who's going!</p>


   <br />

   <div className={'modal fade bs-example-modal-lg' + this.props.match.cid} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
       <div className="modal-dialog modal-md">
           <div className="modal-content bio-modal">
               <div className="col-sm-4 col-md-3">
                   <img src={ this.state.image } />
               </div>
               <div className="col-sm-12 col-md-9">
                   <h1>Players Attending:</h1>
                   <ul>
                     {attendees}
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

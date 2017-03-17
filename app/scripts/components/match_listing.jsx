var React = require('react');


class MatchListing extends React.Component {
  render(){
    return(
      <div>
        <div className="container">
          <div className="game-template col-md-4">
            <div className="thumbnail">
              <MatchListingModal />
              <div className="caption">
                <h3>Date and Time</h3>
                <h3>Address</h3>
                <p>Game Description</p>

                <div className="btn-group">
                  <input type="integer" className="form-control" placeholder="Guests?" />
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Attending? <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">Going</a></li>
                    <li><a href="#">Not Going</a></li>
                    <li><a href="#">Maybe</a></li>
                  </ul>
                  <a href="#/home" className="btn btn-primary" role="button">Submit</a>
                </div>
              </div>
            </div>
          </div>
        <div className="row" />
      </div>
    </div>
    )
  }
};

class MatchListingModal extends React.Component{
  render(){
    return(
<div>
      <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src="http://placehold.it/250x250/" /></a>

      <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-md">
              <div className="modal-content bio-modal">
                  <div className="col-sm-12 col-md-3">
                      <img src="http://placehold.it/150x150"/>
                  </div>
                  <div className="col-sm-12 col-md-9">
                      <h1>Players Attending:</h1>
                      <ul>
                        <li>Listing of attending players by username.</li>
                      </ul>
                  </div>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
</div>
)
  }
};


module.exports = MatchListing;

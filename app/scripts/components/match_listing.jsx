var React = require('react');


class MatchListing extends React.Component {
  render(){
    return(
      <div>
        <div className="container">
          <div className="game-template col-md-4">
            <div className="thumbnail">
              <MatchListingModal />
              <div className="caption text-center">
                <h5>Date and Time</h5>
                <h5>Address</h5>
                <p>Game Description</p>

                  <a href="#/home" className="btn btn-success text-right" role="button">Going!</a>
                </div>
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
  render(){
    return(
<div>
      <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src="http://placehold.it/250x250/" /></a>
      <p className="text-center">Click on image to view who's going!</p>

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
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
              </div>
          </div>
      </div>
</div>
)
  }
};


module.exports = MatchListing;

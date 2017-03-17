var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');

class CreateMatch extends React.Component {
  render(){
    return(
      <BaseLayout>
          <div className="container">
            <div className="game-template col-md-6">
              <div className="thumbnail">
                <div className="caption">
                  <div className="form-group">
                    <label htmlFor="usr">Date</label>
                    <input type="text" className="form-control" id="date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Time</label>
                    <input type="password" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Address</label>
                    <input type="password" className="form-control" id="pwd" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Match Description:</label>
                    <textarea className="form-control" rows="4" id="description"></textarea>
                  </div>

                    <a href="#/home" className="btn btn-primary" role="button">Create Match</a>
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

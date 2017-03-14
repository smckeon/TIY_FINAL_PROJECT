var React = require('react');

class BaseLayout extends React.Component {
  render(){
    return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-brand-centered">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand navbar-brand-centered">_Futbol Finder</div>
          </div>

          <div className="collapse navbar-collapse" id="navbar-brand-centered">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Username</a></li>
              <li><a href="#/home">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

module.exports = {
  BaseLayout
}

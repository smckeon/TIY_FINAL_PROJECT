var React = require('react');

class HomeContainer extends React.Component {
  render(){
    return(
      <div>

      <HomeHeader />

      <AboutUs />

    </div>

    )
  }
};

class AboutUs extends React.Component {
  render(){
    return(
      <div>
        <div className="col-md-push-3 col-md-6">
          <h3>What We Do</h3>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>


        </div>
      </div>
    )
  }
};

class HomeHeader extends React.Component{

  render(){
    return(
      <nav className="navbar navbar-default" role="navigation" id="header-nav">
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
            <li><a href="#">Contact Us</a></li>
            <li><a href="#/auth">Login | Signup</a></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
};

module.exports = {
  HomeContainer
}

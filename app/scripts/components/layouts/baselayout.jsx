var React = require('react');
var Backbone = require('backbone');

var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var User = require('../../models/user.js').User;

class BaseLayout extends React.Component {
  render(){
    return(
      <div>
        <Header />
        <img className="homebg" src="./images/grassbg.jpg"/>
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

class Header extends React.Component{
  render(){
    return(
      <div className="auth-header">
        <nav className="navbar" role="navigation" id="header-nav">
            <div className="container">
  		    <div className="navbar-header">
  		      <a className="navbar-brand navbar-brand-centered" href="#"><img src=".../../images/ff_logo.png" /></a>
  		    </div>

  		    <div className="collapse navbar-collapse" id="navbar-brand-centered">
  		      <ul className="nav navbar-nav navbar-right">
  		        <li className="contact_us"><a href="#">Contact Us</a></li>

              {User.currentUser() ? <LoggedInNavItem /> : <SignupNavItem />}
  		      </ul>
  		    </div>
  		  </div>
  		</nav>
    </div>

    )
  }
}

class SignupNavItem extends React.Component{
  render(){
    return(
      <a href="#/auth" className="btn btn-success signup-btn" role="button">
        Login | Signup
      </a>
    )
  }
}

class LoggedInNavItem extends React.Component{
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this);
  }
  logout(){
    User.logout();
    // localStorage.clear();
    Backbone.history.navigate('#/auth', { trigger: true });
  }
  render(title){
    return(
      <NavDropdown title={User.currentUser().get('name') ?
                          User.currentUser().get('name') :
                          User.currentUser().get('username')}
                          id="nav-dropdown">
        <MenuItem className="dropdown-item" href="#/home">Match Browser</MenuItem>
        <MenuItem className="dropdown-item" href="#/create">Create Match</MenuItem>
        <MenuItem className="dropdown-item" href="#/account">Account Info</MenuItem>
        <MenuItem className="dropdown-item" onClick={this.logout}>Logout</MenuItem>
      </NavDropdown>
    )
  }
}

class Footer extends React.Component{
  render(){
    return(
      <div clasName="container footer_holder">
        <div className="row">
          <div className="footer">
            <ul className="footer-nav well">
              <li>
                <span>&copy; Sean McKeon, 2017</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = BaseLayout;

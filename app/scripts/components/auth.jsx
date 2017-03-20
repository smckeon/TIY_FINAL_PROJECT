var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

// var BaseLayout = require('../../layouts/baselayout.jsx').BaseLayout;
var User = require('../models/user').User;

var serverUrl = 'https://futbol-finder.herokuapp.com';

class AuthContainer extends React.Component {
  constructor(props){
      super(props);

  this.login = this.login.bind(this);

  }

  login(credentials){
    User.login(credentials,  function(user){
      Backbone.history.navigate('/home', {trigger: true});
    });
  }
  createNewAccount(credentials){
    console.log(credentials);
    var user = new User(credentials);
    user.save().then(function(data){
      data.username = credentials.username;
      localStorage.setItem('user', JSON.stringify(data));
      Backbone.history.navigate('/home', {trigger: true});
    });
  }

  render(){
    //
    return (
    <div>
      <AuthHeader />
      <img className="homebg" src="./images/grassbg.jpg" />

        <div className="container auth_contain">
          <div className="row">
           <div className="col-md-12">
              <div className="col-md-6">
                <div className="well">

                 <Login action={this.login} submitBtn='Login' title = 'Please Login' />

               </div>
               </div>

               <div className="col-md-6">
               <div className="well">

                 <SignUp action={this.createNewAccount} submitBtn='Login' title = 'No Account? Sign Up!' />

               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
    )
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  setEmail(e){
    this.setState({username: e.target.value});
  }
  setPassword(e){
    this.setState({password: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }

  render(){
    return (
     <form onSubmit={this.handleSubmit} id="login">
       <h2>{this.props.title}</h2>
       <div className="form-group">
         <input onChange={this.setEmail} value={this.state.username} className="form-control" name="email" id="email-login" type="email" placeholder="Email"  />
       </div>

       <div className="form-group">
         <input onChange={this.setPassword} value={this.state.password} className="form-control" name="password" id="password-login" type="password" placeholder="Enter Password" />
       </div>

       <input className="btn btn-success form-control" type="submit" value="Login" value={this.props.submitBtn}  />
     </form>
    )
  }
};

class SignUp extends Login {

  // render(){
  //   return(
  //     <form id="signup">
  //
  //       <div className="form-group">
  //         <input id="signup-email" className="form-control" type="email" name="email" placeholder="Email Address" />
  //       </div>
  //
  //       <div className="form-group">
  //         <input id="signup-password" className="form-control" type="password" name="password" placeholder="Enter New Password" />
  //       </div>
  //
  //       <input className="btn btn-primary form-control" type="submit" name="" value="Sign Up!" onClick={this.props.handleSignUpButton} />
  //     </form>
  //   )
  // }

};

class AuthHeader extends React.Component {
  render(){
    return(
      <div className="auth-header">
        <nav className="navbar navbar-default" role="navigation" id="header-nav">
            <div className="container">
  		    <div className="navbar-header">
  		      <a className="navbar-brand navbar-brand-centered" href="#"><img src="./images/logo.png" /></a>
  		    </div>

  		    <div className="collapse navbar-collapse" id="navbar-brand-centered">
  		      <ul className="nav navbar-nav navbar-right">
  		        <li><a href="#/auth">Contact Us</a></li>
  		      </ul>
  		    </div>
  		  </div>
  		</nav>
    </div>
    )
  }
};


module.exports = AuthContainer;

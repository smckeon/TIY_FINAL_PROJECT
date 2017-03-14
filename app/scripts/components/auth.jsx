var $ = require('jquery');
var React = require('react');

// var BaseLayout = require('../../layouts/baselayout.jsx').BaseLayout;

var serverUrl = 'https://futbol-finder.herokuapp.com';

class AuthContainer extends React.Component {

  handleSignUpButton(e){
    e.preventDefault();

    var user = {
      username: $('#signup-email').val(),
      password: $('#signup-password').val()
    }
    $.post(serverUrl + '/users', user).then(function(data){
   console.log(data);
    });
  }

  handleLoginButton(e){
    e.preventDefault();
    var self = this;

    var user = {
      username: $('#email-login').val(),
      password: $('#password-login').val()
    }

    var url = serverUrl + '/login?username=' +
      encodeURIComponent(user.username) + '&' +
      'password=' + encodeURIComponent(user.password)

    $.get(url).then(function(data){
      localStorage.setItem('userToken', data.sessionToken);
      self.props.navigate('#/home', {trigger: true});
    });
  }

  render(){
    //
    return (
    <div>
      <AuthHeader />

        <div className="container">
          <div className="row">
           <div className="col-md-12">
              <div className="col-md-6">
                <div className="well">

                 <h2>Please Login</h2>

                 <Login handleLoginButton={this.handleLoginButton.bind(this)}/>

               </div>
               </div>

               <div className="col-md-6">
               <div className="well">

                 <h2>No Account? Sign Up!</h2>

                 <SignUp handleSignUpButton={this.handleSignUpButton.bind(this)} />
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

  render(){
    return (
     <form id="login">
       <div className="form-group">
         <input className="form-control" name="email" id="email-login" type="email" placeholder="Email" />
       </div>

       <div className="form-group">
         <input className="form-control" name="password" id="password-login" type="password" placeholder="Enter Password" />
       </div>

       <input className="btn btn-primary form-control" type="submit" value="Login"  onClick={this.props.handleLoginButton}  />
     </form>
    )
  }
};

class SignUp extends React.Component {

  render(){
    return(
      <form id="signup">
        <div className="form-group">
          <input id="signup-email" className="form-control" type="email" name="email" placeholder="Email Address" />
        </div>

        <div className="form-group">
          <input id="signup-password" className="form-control" type="password" name="password" placeholder="Enter New Password" />
        </div>

        <input className="btn btn-primary form-control" type="submit" name="" value="Sign Up!" onClick={this.props.handleSignUpButton} />
      </form>
    )
  }

};

class AuthHeader extends React.Component {
  render(){
    return(
      <div className="auth-header">
        <nav className="navbar navbar-default" role="navigation" id="header-nav">
            <div className="container">
  		    <div className="navbar-header">
  		      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-brand-centered">
  		        <span className="sr-only">Toggle navigation</span>
  		        <span className="icon-bar"></span>
  		        <span className="icon-bar"></span>
  		        <span className="icon-bar"></span>
  		      </button>
  		      <a className="navbar-brand navbar-brand-centered" href="#">_Futbol Finder</a>
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


module.exports = {
  AuthContainer
}

var React = require('react');

class AccountInfoContainer extends React.Component {

  render(){
    return (
      <div>
      <AccountHeader />
        <div className="container">
          <div className="row">

            <form className="form-horizontal">
              <fieldset>

                <legend>Account Information</legend>

                  <div className="col-md-2">

                    <ImageUploadModal />

	                </div>

                  <div className="col-md-4">

                    <AccountInputFields />

                  </div>

              </fieldset>
            </form>

        	</div>
        </div>
      </div>
    )
  }
};


class AccountHeader extends React.Component {

  render(){
    return(
    <nav className="navbar navbar-default" role="navigation">
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
            <li><a href="#">Signout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

module.exports = {
  AccountInfoContainer
}

class AccountInputFields extends React.Component {

  render(){
    return(
      <div>
      <div className="control-group">
        <label className="control-label" htmlFor="email">Name</label>
        <div className="controls">
          <input id="name" name="name" type="text" placeholder="" className="input-xlarge" required="" />

        </div>
      </div>

      <div className="control-group">
        <label className="control-label" htmlFor="number">Phone Number</label>
        <div className="controls">
          <input id="number" name="number" type="text" placeholder="" className="input-xlarge" required="" />

        </div>
      </div>

    <div className="control-group">
      <label className="control-label" htmlFor="email">Email Address</label>
      <div className="controls">
        <input id="email" name="email" type="text" placeholder="" className="input-xlarge" required="" />

      </div>
    </div>

    <div className="control-group">
      <label className="control-label" htmlFor="password">Password</label>
      <div className="controls">
        <input id="password" name="password" type="password" placeholder="" className="input-xlarge" required="" />

      </div>
    </div>

    <div className="control-group">
      <label className="control-label" htmlFor="confirmpassword">Confirm Password</label>
      <div className="controls">
        <input id="confirmpassword" name="confirmpassword" type="password" placeholder="" className="input-xlarge" required="" />

      </div>
    </div>

    <div className="control-group">
      <label className="control-label" htmlFor="button1id"></label>
      <div className="controls">
        <button id="button1id" name="button1id" className="btn btn-primary">Save</button>
        <button id="button2id" name="button2id" className="btn btn-default">Cancel</button>
      </div>
    </div>
    </div>
    )
  }
};

class ImageUploadModal extends React.Component {
  render(){
    return(
    <div>
      <a data-toggle="modal" data-target=".bs-example-modal-lg"><img src="http://placehold.it/150x150/" /></a>

      <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-md">
              <div className="modal-content bio-modal">
                  <div className="col-sm-12 col-md-3">
                      <img src="http://placehold.it/150x150"/>
                  </div>
                  <div className="col-sm-12 col-md-9">
                      <h1>Name / Username</h1>
                      <span>Please upload a new picture.</span>
                  </div>
                  {/*<div style="clear:both;"></div>*/}
              </div>
          </div>
      </div>
    </div>
    )
  }

};

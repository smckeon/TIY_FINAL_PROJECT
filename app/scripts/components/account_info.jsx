var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');

var User = require('../models/user').User;

var ParseFile = require('../models/parsefile').ParseFile;

class AccountInfoContainer extends React.Component {

  constructor(props){
    super(props);

    var user = User.currentUser();

    this.state = {
      pic: null,
      user: User.currentUser()
    }

    this.handleImage = this.handleImage.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleImage(file) {
    this.setState({'pic': file});
  }

  handleName(name) {
    this.state.user.set({'name': name});
  }

  handleNumber(number) {
    this.state.user.set({'number': number});
  }


  handleSave(e) {
    e.preventDefault();

    var pic = this.state.pic;
    var image = new ParseFile(pic);
    image.save({}, {
      data: pic
    }).then((response)=>{
      var imageUrl = response.url;

      this.state.user.set({'imageUrl': imageUrl});
    });

    this.state.user.save();
  }

  render(){

    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <div className="well">

            <form className="form-horizontal" encType="multipart/form-data">

              <fieldset>

                <legend>Account Information</legend>

                  <div className="col-md-push-3 col-md-4">

                    <ImageUpload user={this.state.user} handleImage={this.handleImage}/>

	                </div>

                  <div className="col-md-push-3 col-md-4">

                    <AccountInputFields handleName={this.handleName} handleNumber={this.handleNumber} handleSave={this.handleSave}/>

                  </div>

              </fieldset>
            </form>

        	</div>
        </div>
      </div>
      </BaseLayout>
    )
  }
};



class AccountInputFields extends React.Component {
  constructor(props){
    super(props);

    var user = User.currentUser();


    this.state = {
      name: user.get('name') || null,
      number: user.get('number') || null
    }

    this.handleName = this.handleName.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
  }

  handleName(e) {
    this.setState({'name': e.target.value});
    this.props.handleName(this.state.name);

  }

  handleNumber(e) {
    this.setState({'number': e.target.value});
    this.props.handleNumber(this.state.number);
  }

  render(){
    return(
    <div>
      <div className="control-group">
        <label className="control-label" htmlFor="email">Name</label>
        <div className="controls">
          <input id="name" name="name" type="text" placeholder="" className="input-xlarge" required="" value={this.state.name} onChange={this.handleName}/>

        </div>
      </div>

      <div className="control-group">
        <label className="control-label" htmlFor="number">Phone Number</label>
        <div className="controls">
          <input id="number" name="number" type="text" placeholder="555-555-5555" maxLength="12" className="input-xlarge" required="" value={this.state.number} onChange={this.handleNumber}/>

        </div>
      </div>


    <div className="control-group">
      <label className="control-label" htmlFor="buttonid"></label>
      <div className="controls">
        <button id="button1id" name="button1id" className="btn btn-primary" onClick={this.props.handleSave}>Update</button>
        <button id="button2id" name="button2id" className="btn btn-default">Cancel</button>
      </div>
    </div>
  </div>
    )
  }
};

class ImageUpload extends React.Component {
  constructor(props){
    super(props);

    var preview;

    this.props.user ? preview = this.props.user.get('imageUrl') : preview = 'http://placehold.it/150x150/'

    this.state = {
      pic: null,
      preview: preview
    };

    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(e) {
    var file = e.target.files[0];
    this.setState({pic: file});
    var reader = new FileReader();
    reader.onloadend = ()=>{
     this.setState({preview: reader.result});
     this.props.handleImage(this.state.pic);
   };

   reader.readAsDataURL(file);

  }

  render(){
    return(
      <div>
        <img src={this.state.preview} />
        <input type="file" onChange={this.handleImage} />
      </div>
    )
  }

};

module.exports = AccountInfoContainer;

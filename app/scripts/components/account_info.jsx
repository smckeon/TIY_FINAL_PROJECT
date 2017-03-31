var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');

var User = require('../models/user').User;

var ParseFile = require('../models/parsefile').ParseFile;


class AccountInfoContainer extends React.Component {

 constructor(props){
   super(props);
   var user = User.currentUser();
   user.fetch().then(()=>{
     this.setState({user})
   });

   this.state = {
     pic: null,
     user
   }

   this.handleImage = this.handleImage.bind(this);
   this.handleSave = this.handleSave.bind(this);
 }

 handleImage(file) {
   this.setState({'pic': file});
 }

 handleSave(config) {
   var user = this.state.user;
   user.set({
     'name': config.name,
     'number': config.number
   });
   if(this.state.pic) {
     var pic = this.state.pic;
     var image = new ParseFile(pic);
     image.save({}, {
       data: pic
     }).then((response)=>{
       var imageUrl = response.url;
       user.set({ 'imageUrl': imageUrl });
       user.save();
       return
     });
   } else {
     user.save();
   }
 }

 render(){

   return (
     <BaseLayout>
       <div className="container acct_info">
         <div className="col-md-push-2 col-md-8">
         <div className="row">
           <div className="well">
           <form className="form-horizontal" encType="multipart/form-data">
             <fieldset>
               <legend>Account Information</legend>
                 <div className="col-md-push-2 col-md-4">
                   <ImageUpload user={this.state.user} handleImage={this.handleImage}/>
                    </div>
                 <div className="col-md-push-3 col-md-4">
                   <AccountInputFields handleSave={this.handleSave} user={this.state.user} />
                 </div>
             </fieldset>
           </form>
           </div>
           </div>
         <div className="acct_photos">
         <div className="col-md-push-1 col-md-6">
           <div className="text_backsplash">
             <img src="./images/sean.jpg" />
           </div>
          </div>
          <div className="col-md-pull-1 col-md-6 col-md-pull-1">
            <div className="text_backsplash">
              <img src="./images/pickup1.jpg" />
            </div>
           </div>
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

   this.state = {
     name: null,
     number: null
   }

   this.handleName = this.handleName.bind(this);
   this.handleNumber = this.handleNumber.bind(this);
   this.handleSave = this.handleSave.bind(this);
 }

 componentWillReceiveProps(nextProps) {
   this.setState({
     name: this.props.user.get('name'),
     number: this.props.user.get('number')
   })
 }
 handleName(e) {
   this.setState({'name': e.target.value});
 }
 handleNumber(e) {
   this.setState({'number': e.target.value});
 }
 handleSave(e) {
   e.preventDefault();
   this.props.handleSave(this.state)
 }
 render(){
   return(
     <div className="well">
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
           {/*<input type="text" className="input-medium bfh-phone" data-format="+1 (ddd) ddd-dddd" />*/}
         </div>
       </div>
       <div className="control-group">
         <label className="control-label" htmlFor="buttonid"></label>
         <div className="controls">
           <button id="button1id" name="button1id" className="btn btn-primary" onClick={this.handleSave}>Update</button>
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

   this.state = {
     pic: null,
     preview: 'http://placehold.it/150x150/'
   };

   this.handleImage = this.handleImage.bind(this);
 }

 componentWillReceiveProps(nextProps) {
   if(this.props.user.get('imageUrl') && this.state.preview == 'http://placehold.it/150x150/')
   {
     this.setState({ 'preview': this.props.user.get('imageUrl') })
   }
 }

 handleImage(e) {
   var file = e.target.files[0];
   this.setState({ pic: file });
   var reader = new FileReader();
   reader.onloadend = ()=>{
     this.setState({ preview: reader.result });
     this.props.handleImage(this.state.pic);
   }
   reader.readAsDataURL(file);
 }

 render(){
   return(
     <div>
       <img src={ this.state.preview } />
       <input type="file" onChange={ this.handleImage } />
     </div>
   )
 }
};

module.exports = AccountInfoContainer;

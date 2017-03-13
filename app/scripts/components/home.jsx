var React = require('react');

class HomeContainer extends React.Component {
  render(){
    return(
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <a href="#/auth">
              <button className="btn btn-primary" type="submit">Button</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    )
  }
};

module.exports = {
  HomeContainer
}

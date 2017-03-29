var React = require('react');

var BaseLayout = require('./layouts/baselayout.jsx');

class HomeContainer extends React.Component {
  render(){
    return(
  <div>

    <BaseLayout>

      <AboutUs />

    </BaseLayout>
  </div>

    )
  }
};

class AboutUs extends React.Component {
  render(){
    return(
      <div>
        <div className="col-md-push-3 col-md-6 col-lg-push-3 col-lg-6 about_us">
          <div className='text_backsplash'>
            <h3 className="about_us_slogan">Bringing people together for the love of the game!</h3>
          </div>
          <div className="text_backsplash">
            <p>_futbol finder was designed for you, the soccer player! We
            share the pride in collectively bringing people together to play.
            Our platform is simple. You log in or sign up, modify your profile,
            and then create local pick up matches for other people to locate! Furthermore,
            other users can see your created matches and designate if they
            will be attending. </p>
          </div>
          <div className="container">
            <div className="row">
              <div className="home-picture col-xs-6 col-sm-4 col-md-4">

                <br />
                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                  <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                  </ol>

                  <div className="carousel-inner" role="listbox">
                    <div className="item active">
                      <img src="./images/home_photo2.jpeg" alt="Chania" width="460" height="345" />
                    </div>

                    <div className="item">
                      <img src="./images/home_photo4.jpeg" alt="Chania" width="460" height="345" />
                    </div>

                    <div className="item">
                      <img src="./images/home_photo1.jpeg" alt="Flower" width="460" height="345" />
                    </div>

                    <div className="item">
                      <img src="./images/home_photo3.jpg" alt="Flower" width="460" height="345" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <br />
          <div className="text_backsplash">
            <p>Our app was designed first and foremost to allow people to play. As
            we continue to update and add more functionality, we will be sure to keep
            you updated on the happenings at _futbol finder. We hope you continue to support
            by simply using the app and spreading the word about us!</p>
          </div>
          <div className="text_backsplash">
            <p>As we consider ourself as much a part of the community as yourself, we
            encourage feedback! So with that being said, please feel free to reach
            out to us via the contact form with questions or concerns.</p>
          </div>
          <div className="text_backsplash">
          <h3 className="text-center">We look forward to seeing you on the pitch!</h3>
          <h4 className="text-center"><i>_futbol finder team</i></h4>
        </div>
      </div>
      <div className="row">  </div>
  </div>
    )
  }
};


module.exports = HomeContainer;

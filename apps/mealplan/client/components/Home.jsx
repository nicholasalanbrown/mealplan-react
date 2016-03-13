import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import HomeLoggedIn from './HomeLoggedIn';
import Content from './Content';

@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {

  getMeteorData() {
    let currentUser = Meteor.userId();
    return {
      currentUser: currentUser
    };
  }

  handleClick() {
    Meteor.loginWithFacebook(function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        FlowRouter.go('home');
      }
    });
  }

  render() {
    if (this.data.currentUser) {
      return (
          <HomeLoggedIn />
      );
    }
    else {
      return (
        <div className="welcome-background">
          <div className="pure-g full-container">
            <div className="pure-u-1-24 pure-u-md-6-24 pure-u-lg-8-24"></div>
            <div className="pure-u-22-24 pure-u-md-12-24 pure-u-lg-8-24 welcome-cta">
              <h1>Never plan another meal.</h1>
              <h4>Join the Eat This Alpha and get 3 dinners for 2 planned for you every week.</h4>
                <a onClick={this.handleClick.bind(this)} id="facebook-login" className="pure-button center" href="">Sign Up with Facebook</a>
            </div>
            <div className="pure-u-1-24 pure-u-md-6-24 pure-u-lg-8-24"></div>
          </div>
        </div>
      );
    }
  }
}

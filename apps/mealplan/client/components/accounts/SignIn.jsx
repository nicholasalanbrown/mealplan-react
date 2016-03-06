import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';

@ReactMixin.decorate(ReactMeteorData)
export default class SignIn extends Component {

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }

  handleClick() {
    Meteor.loginWithFacebook(function(error, result) {
      if (error) {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <Content>
        <h1>Sign In</h1>
        <a onClick={this.handleClick.bind(this)} id="facebook-login" className="pure-button" href="#">Sign In with Facebook</a>
      </Content>
    );
  }
}

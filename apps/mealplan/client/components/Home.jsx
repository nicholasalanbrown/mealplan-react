import { Component, PropTypes } from 'react';
import Other from './Other';
import Content from './Content';

export default class Home extends Component {

  render() {
    let loginStatus;
    if (Meteor.user()) {
      loginStatus = "You are currently logged in."
    }
    else {
      loginStatus = "Please log in."
    }
    return (
      <Content>
        <p>{loginStatus}</p>
      </Content>
    );
  }
}

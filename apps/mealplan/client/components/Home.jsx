import { Component, PropTypes } from 'react';
import Other from './Other';
import Content from './Content';

export default class Home extends Component {

  render() {
    if (Meteor.user()) {
      return (
        <Content>
          <p>You are logged in!</p>
        </Content>
      );
    }
    else {
      return (
        <div className="welcome-background">
          <h1>Never plan another meal.</h1>
        </div>
      );
    }
  }
}

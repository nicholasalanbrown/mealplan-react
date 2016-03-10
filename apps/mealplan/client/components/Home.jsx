import { Component, PropTypes } from 'react';

import HomeLoggedIn from './HomeLoggedIn';
import Content from './Content';

export default class Home extends Component {

  render() {
    if (Meteor.user()) {
      return (
        <Content>
          <HomeLoggedIn />
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

import { Component } from 'react';
import ReactMixin from 'react-mixin';

import Header from './Header';
@ReactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.content}
      </div>
    );
  }
};

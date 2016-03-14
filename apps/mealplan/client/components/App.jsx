import { Component } from 'react';
import ReactMixin from 'react-mixin';

import Header from './Header';
import Menu from './Menu';

@ReactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      user: Meteor.user()
    };
  }

  state = {
    menuOpen: false
  }

  toggleMenu = (e) => {
    console.log('test2');
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    return (
      <div>
        <Menu ref="right" alignment="right" visible={this.state.menuOpen}>
        </Menu>
        <Header toggleMenu={this.toggleMenu} />
        {this.props.content}
      </div>
    );
  }
};

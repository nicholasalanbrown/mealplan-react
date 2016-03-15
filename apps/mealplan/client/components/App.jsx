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
    this.setState({menuOpen: !this.state.menuOpen});
  }

  closeMenu = (e) => {
    this.setState({menuOpen: false});
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Menu ref="right" alignment="right" visible={this.state.menuOpen}>
        </Menu>
        <Header closeMenu={this.closeMenu} toggleMenu={this.toggleMenu} />
        <div onClick={this.closeMenu} id="page-wrapper">
          {this.props.content}
        </div>
      </div>
    );
  }
};

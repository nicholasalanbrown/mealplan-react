import { Component, PropTypes } from 'react';
let Menu = require('react-burger-menu').push;

export default class Mobile_Menu extends Component {

  render() {
    if (this.props.isOpen) {
      return (
        <Menu pageWrapId={ "page-wrapper"} outerContainerId={ "outer-wrapper" } isOpen={true}>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
        </Menu>
      );
    }
    else {
      return (
        <Menu pageWrapId={ "page-wrapper"} outerContainerId={ "outer-wrapper" } isOpen={false}>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
        </Menu>
      );
    }
  }
}

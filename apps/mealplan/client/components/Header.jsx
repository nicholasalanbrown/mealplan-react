import { Component, PropTypes } from 'react';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li><a href="/">Meal Plan</a></li>
          <li><a href="/other">Other Page</a></li>
        </ul>
      </nav>
    );
  }
}

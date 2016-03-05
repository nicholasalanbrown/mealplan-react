import { Component, PropTypes } from 'react';
import Headroom from 'react-headroom';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {

  render() {
    let loginLink = <a href="/sign-in" className="pure-menu-link">Sign In</a>;
    if (Meteor.userId()) {
      loginLink = <a href="#" className="pure-menu-link">Sign Out</a>;
    }
    return (
      <Headroom>
      <nav className="navbar">
        <div className="brand">
          <a href="/">Meal Plan</a>
        </div>
        <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
                <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                    <a href="#" className="pure-menu-link">Recipes</a>
                    <ul className="pure-menu-children">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Add New</a></li>
                        <li className="pure-menu-item"><a href="/recipes" className="pure-menu-link">View All</a></li>
                    </ul>
                </li>
                <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                    <a href="#" className="pure-menu-link">Ingredients</a>
                    <ul className="pure-menu-children">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Add New</a></li>
                        <li className="pure-menu-item"><a href="/ingredients" className="pure-menu-link">View All</a></li>
                    </ul>
                </li>
                <li className="pure-menu-item pure-menu-selected">{loginLink}</li>
            </ul>
        </div>
      </nav>
      </Headroom>
    );
  }
}

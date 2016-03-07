import { Component, PropTypes } from 'react';
import Headroom from 'react-headroom';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {

  handleLogout() {
    Meteor.logout(function(error) {
      if (error) {
        console.log(error);
      }
      else {
        FlowRouter.go('login');
      }
    });
  }

  render() {
    let linkList;
    let loginLink = <a href={FlowRouter.path('login')} className="pure-menu-link">Sign In</a>;
    if (Meteor.userId()) {
      loginLink = <a onClick={this.handleLogout.bind(this)} href="" className="pure-menu-link">Sign Out</a>;
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admins')) {
      linkList =
      <div className="pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list">
              <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                  <a href="" className="pure-menu-link">Recipes</a>
                  <ul className="pure-menu-children">
                      <li className="pure-menu-item"><a href={FlowRouter.path('addRecipe')} className="pure-menu-link">Add New</a></li>
                      <li className="pure-menu-item"><a href="/recipes" className="pure-menu-link">View All</a></li>
                  </ul>
              </li>
              <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                  <a href="" className="pure-menu-link">Ingredients</a>
                  <ul className="pure-menu-children">
                      <li className="pure-menu-item"><a href={FlowRouter.path('addIngredient')} className="pure-menu-link">Add New</a></li>
                      <li className="pure-menu-item"><a href="/ingredients" className="pure-menu-link">View All</a></li>
                  </ul>
              </li>
              <li className="pure-menu-item pure-menu-selected">{loginLink}</li>
          </ul>
      </div>
    }
    else {
      linkList =
      <div className="pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list">
              <li className="pure-menu-item pure-menu-selected">{loginLink}</li>
          </ul>
      </div>
    }
    return (
      <div>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Headroom>
      <nav className="navbar">
        <div className="brand">
          <a href="/"><span className="brand-1">eat</span><span className="brand-2">this</span></a>
        </div>
        {linkList}
      </nav>
      </Headroom>
      </div>
    );
  }
}

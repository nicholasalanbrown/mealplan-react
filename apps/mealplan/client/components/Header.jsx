import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Helmet from 'react-helmet';
import Headroom from 'react-headroom';

import styles from '../styles/modules/_header.import.scss';

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

  closeMenu = () => {
    this.props.closeMenu();
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  }

  render() {
    let linkList;
    let loginLink = <a href={FlowRouter.path('login')} className='pure-menu-link'>Sign In</a>;
    if (Meteor.userId()) {
      loginLink = <a onClick={this.handleLogout.bind(this)} href='' className='pure-menu-link'>Sign Out</a>;
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admins')) {
      linkList =
      <div>
      <div className='pure-menu pure-menu-horizontal hidden-sm'>
          <ul className='pure-menu-list'>
              <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
                  <a href='' className='pure-menu-link'>Recipes</a>
                  <ul className='pure-menu-children box-shadowed'>
                      <li className='pure-menu-item'><a href={FlowRouter.path('addRecipe')} className='pure-menu-link'>Add New</a></li>
                      <li className='pure-menu-item'><a href='/recipes' className='pure-menu-link'>View All</a></li>
                  </ul>
              </li>
              <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
                  <a href='' className='pure-menu-link'>Ingredients</a>
                  <ul className='pure-menu-children box-shadowed'>
                      <li className='pure-menu-item'><a href={FlowRouter.path('addIngredient')} className='pure-menu-link'>Add New</a></li>
                      <li className='pure-menu-item'><a href='/ingredients' className='pure-menu-link'>View All</a></li>
                  </ul>
              </li>
              <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
                  <a href='' className='pure-menu-link'>Cuisines</a>
                  <ul className='pure-menu-children box-shadowed'>
                      <li className='pure-menu-item'><a href={FlowRouter.path('addCuisine')} className='pure-menu-link'>Add New</a></li>
                  </ul>
              </li>
              <li className='pure-menu-item pure-menu-selected'>{loginLink}</li>
          </ul>
      </div>
      <i onClick={this.toggleMenu} className="ion-navicon-round visible-sm" styleName="hamburger"/>
      </div>
    }
    else {
      linkList =
      <div>
      <div className='pure-menu pure-menu-horizontal hidden-sm'>
          <ul className='pure-menu-list'>
              <li className='pure-menu-item pure-menu-selected'>{loginLink}</li>
          </ul>
      </div>
      <i onClick={this.toggleMenu} className="ion-navicon-round visible-sm" styleName="hamburger"/>
      </div>
    }
    return (
      <div>
      <Helmet
        title='Eat This'
        meta={[
            {'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no'}
        ]}
      />
      <nav className='navbar'>
        <div className='brand'>
          <a href='/' styleName="navbar-logo"><span styleName='logo-1'>eat</span><span styleName='logo-2'>this</span></a>
        </div>
        {linkList}
      </nav>
      </div>
    );
  }
}

export default CSSModules(Header, styles);

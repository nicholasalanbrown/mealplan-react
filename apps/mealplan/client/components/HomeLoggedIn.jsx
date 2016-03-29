import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import styles from '../styles/modules/home/_home.import.scss';

import HomeHero from './home/HomeHero';
import Content from './Content';
import Loading from './Loading';
import Dashboard from './home/Dashboard';

import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class HomeLoggedIn extends Component {

  getMeteorData() {
    let planSubscription = Meteor.subscribe('getWeekPlan');
    let userSubscription = Meteor.subscribe('userData');
    return {
      subscriptionLoading: !planSubscription.ready() || !userSubscription.ready(),
      user: Meteor.user(),
      plans: Plans.findOne(),
      recipes: Recipes.find().fetch()
    }
  }

  render() {
    if (this.data.subscriptionLoading) {
      return <Loading />
    }
    else {
      console.log(this.data);
      return (
        <div>
          <HomeHero name={this.data.user.services.facebook.first_name} />
          <Content>
            <Dashboard />
          </Content>
        </div>
        );
      }
    }
  }

export default CSSModules(HomeLoggedIn, styles);

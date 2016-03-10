import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from './Content';
import WeekPlan from './plans/WeekPlan';
import Plans from 'mealplan/collections/Plans';

@ReactMixin.decorate(ReactMeteorData)
export default class HomeLoggedIn extends Component {

  getMeteorData() {
    let planSubscription = Meteor.subscribe('getWeekPlan');
    return {
      planSubscriptionLoading: !planSubscription.ready(),
      weekPlan: Plans.findOne()
    };
  }

  render() {
    return (
      <div>You are logged in! Home!</div>
    )
  }

  render() {
    if (this.data.planSubscriptionLoading) {
      return (<div>Loading</div>)
    }
    else {
      return (
        <WeekPlan weekPlan={this.data.weekPlan} />
      );
    }
  }
/*

  getMeteorData() {
    let planSubscription = Meteor.subscribe('getWeekPlan');
    return {
      planSubscriptionLoading: !planSubscription.ready(),
      weekPlan: Plans.findOne()
    };
  }

  render() {
    if (planSubscriptionLoading) {
      return <div></div>
    }
    else {
      return (
        <WeekPlan />
      );
    }
  }
*/
}

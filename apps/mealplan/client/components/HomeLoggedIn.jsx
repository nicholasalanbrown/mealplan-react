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

  generatePlan = () => {
    Meteor.call('generateMyPlan');
  }

  deletePlan = () => {
    Meteor.call('removePlan');
  }

  render() {
    return (
      <div>You are logged in! Home!</div>
    )
  }

  render() {
    let adminButtons;
    if (Roles.userIsInRole(Meteor.userId(), 'admins')) {
      adminButtons =
        <div>
          <button onClick={this.generatePlan.bind(this)} className="pure-button pure-button-primary">Generate Meal Plan</button>
          <a onClick={this.deletePlan.bind(this)}href="">Delete Meal Plan</a>
        </div>
    }
    if (this.data.planSubscriptionLoading) {
      return (<div>Loading</div>)
    }
    else if (this.data.weekPlan){
      console.log(this.data.weekPlan);
      return (
        <div>
        <WeekPlan weekPlan={this.data.weekPlan} />
        {adminButtons}
        </div>
      );
    }
    else {
      return (
        <div>
        {adminButtons}
        </div>
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

import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import moment from 'moment';

import Content from './Content';
import Loading from './Loading';
import WeekPlan from './plans/WeekPlan';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class HomeLoggedIn extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('getWeekPlan');
    let user = Meteor.user();
    let receivingPlans;
    if (user) {
      receivingPlans = user.profile.receivingPlans;
    }
    return {
      subscriptionLoading: !subscription.ready(),
      receivingPlans: receivingPlans,
      weekPlan: Plans.findOne()
    };
  }

  generatePlan = () => {
    Meteor.call('generateMyPlan', function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        return result;
      }
    });
  }

  deletePlan = () => {
    Meteor.call('removePlan', function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        return result;
      }
    });
  }

  handleClick = () => {
    this.refs.onoffswitch.checked = !this.refs.onoffswitch.checked;
    Meteor.call('togglePlanSubscription');
  }

  handleChange = (e) => {
  }

  render() {
    let adminButtons;
    if (Roles.userIsInRole(Meteor.userId(), 'admins')) {
      adminButtons =
        <div className="plan-admin-buttons">
          <button onClick={this.generatePlan.bind(this)} className="pure-button pure-button-primary">Regenerate</button>
          <a className="danger" onClick={this.deletePlan.bind(this)}href="">Delete</a>
        </div>
    }
    if (this.data.subscriptionLoading) {
      return (<Loading />)
    }
    else {
      let weekPlan;
      if (this.data.weekPlan){
        weekPlan = <WeekPlan weekPlan={this.data.weekPlan} />
      }
      else {
        weekPlan =
        <h3>You don't have any meal plans!</h3>
      }
      let emailSwitch =
      <div className="switch-container">
        <div onClick={this.handleClick.bind(this)} className="onoffswitch">
            <input onChange={this.handleChange} ref="onoffswitch" defaultChecked={this.data.receivingPlans} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch"/>
            <label className="onoffswitch-label" for="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
            </label>
        </div>
        <div className="switch-cta">
        Email my plan to me every Sunday
        </div>
      </div>
      ;
      return (
        <Content>
          <div className="center">
          <h2>Welcome to Eat This Alpha!</h2>
          <span className="week-title">Week of {moment().startOf('week').format('MMMM Do')} - {moment().endOf('week').format('MMMM Do YYYY')}</span>
          {weekPlan}
          {emailSwitch}
          {adminButtons}
          </div>
        </Content>
      );
    }
  }
}

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
    let dinners;
    let servings;
    let receivingPlans;
    if (user) {
      dinners = user.profile.defaultMeals.dinners;
      servings = user.profile.householdMembers;
      receivingPlans = user.profile.receivingPlans;
    }
    return {
      subscriptionLoading: !subscription.ready(),
      receivingPlans: receivingPlans,
      dinners: dinners,
      serings: servings,
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
      let dinners = this.data.dinners;
      let servings = this.data.servings;
      let weekPlan;
      if (this.data.weekPlan){
        weekPlan = <WeekPlan weekPlan={this.data.weekPlan} />
      }
      else  {
        weekPlan =
        <h4 className="weekplan-empty">You don't have a meal plan yet. Your first plan will appear here this Sunday.</h4>
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
          <h4>Dinners per week: {dinners} Servings: {servings}</h4>
          <div className="weekplan-container">
            {weekPlan}
          </div>
          {emailSwitch}
          {adminButtons}
          </div>
        </Content>
      );
    }
  }
}
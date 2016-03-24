import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import moment from 'moment';

import Content from './Content';
import Loading from './Loading';
import HomeCard from './home/HomeCard';
import WeekPlan from './plans/WeekPlan';
import ShoppingList from './shopping/ShoppingList';
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
      servings: servings,
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
        <div className="pure-g">
          <div className="pure-u-1-24 pure-u-md-4-24 pure-u-lg-6-24"></div>
          <div className="pure-u-22-24 pure-u-md-16-24 pure-u-lg-12-24">
            <h4 className="weekplan-empty">You don't have a meal plan yet. Your first plan will appear here this Sunday.</h4>
          </div>
        </div>
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
          <div className="pure-u-24-24 pure-u-md-16-24 pure-u-lg-16-24">
            <h2>This Week</h2>
              {weekPlan}
          </div>
          <div className="pure-u-24-24 pure-u-md-8-24 pure-u-lg-8-24">
            <h3>Shopping List</h3>
              <ShoppingList weekPlan={this.data.weekPlan} />
          </div>
        {/*
          <div className="center">
          <ShoppingList weekPlan={this.data.weekPlan} />
          <h2>Welcome to Eat This Alpha!</h2>
          <span className="week-title">Week of {moment().startOf('week').format('MMMM Do')} - {moment().endOf('week').format('MMMM Do YYYY')}</span>
          <h4>Dinners per week: {dinners} Servings: {servings}</h4>
          <div className="weekplan-container">
            {weekPlan}
          </div>
          <div className="pure-g">
            <div className="pure-u-1-24 pure-u-md-4-24 pure-u-lg-4-24"></div>
            <div className="pure-u-22-24 pure-u-md-16-24 pure-u-lg-16-24">
              {emailSwitch}
            </div>
          </div>
          {adminButtons}
          </div>
          */}
        </Content>
      );
    }
  }
}

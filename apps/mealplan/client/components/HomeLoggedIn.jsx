import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import styles from '../styles/modules/home/_home.import.scss';

import Content from './Content';
import Loading from './Loading';
import HomeHero from './home/HomeHero';
import MealPlan from './home/MealPlan';
import WeekPlan from './plans/WeekPlan';
import ShoppingList from './shopping/ShoppingList';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class HomeLoggedIn extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('getWeekPlan');
    let userSubscription = Meteor.subscribe('userData');
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
      subscriptionLoading: !subscription.ready() || !userSubscription.ready(),
      receivingPlans: receivingPlans,
      dinners: dinners,
      servings: servings,
      user: user,
      weekPlan: Plans.findOne()
    };
  }

  state = {
    showPlan: true
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

  toggleView = (e) => {
    this.setState({showPlan: !this.state.showPlan})
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
      let mealPlan;
      let shoppingList;
      if (this.data.weekPlan){
        mealPlan = <WeekPlan weekPlan={this.data.weekPlan} showPlan={this.state.showPlan}/>;
        shoppingList = <ShoppingList weekPlan={this.data.weekPlan} />;
      }
      else  {
        mealPlan =
        <div className="pure-g">
          <div className="pure-u-1-24 pure-u-md-4-24 pure-u-lg-6-24"></div>
          <div className="pure-u-22-24 pure-u-md-16-24 pure-u-lg-12-24">
            <h4 className="weekplan-empty">You don't have a meal plan yet. Your first plan will appear here this Sunday.</h4>
          </div>
        </div>
      }
      let recipeList;
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
        <div>
        <HomeHero name={this.data.user.services.facebook.first_name}/>
        <Content>
          <div className="pure-u-24-24 pure-u-md-15-24 pure-u-lg-15-24">
              {mealPlan}
            </div>
          <div className="pure-u-1-24 pure-u-md-1-24 pure-u-lg-1-24"></div>
          <div className="pure-u-24-24 pure-u-md-8-24 pure-u-lg-8-24">
              {shoppingList}
          </div>
        {/*
          <div className="pure-u-24-24 pure-u-md-16-24 pure-u-lg-16-24">
            <h3 styleName='planTitle'>{moment().startOf('week').format('MMMM Do')} - {moment().endOf('week').format('MMMM Do YYYY')}</h3>
            <i styleName={this.state.showPlan ? 'active-calendar' : 'calendar'} onClick={this.toggleView.bind(this)} className="fa fa-calendar-o"></i>
            <i styleName={this.state.showPlan ? 'list' : 'active-list'} onClick={this.toggleView.bind(this)} className='fa fa-th-list'></i>
              {weekPlan}
          </div>
          <div className="pure-u-24-24 pure-u-md-8-24 pure-u-lg-8-24">
            <h3>Shopping List</h3>
              <ShoppingList weekPlan={this.data.weekPlan} />
          </div>
          <div className="center">
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
        </div>
      );
    }
  }
}

export default CSSModules(HomeLoggedIn, styles);

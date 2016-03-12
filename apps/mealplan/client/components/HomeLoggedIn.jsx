import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from './Content';
import Loading from './Loading';
import WeekPlan from './plans/WeekPlan';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class HomeLoggedIn extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('getWeekPlan');
    return {
      subscriptionLoading: !subscription.ready(),
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

  render() {
    let adminButtons;
    if (Roles.userIsInRole(Meteor.userId(), 'admins')) {
      adminButtons =
        <div>
          <button onClick={this.generatePlan.bind(this)} className="pure-button pure-button-primary">Generate Meal Plan</button>
          <a onClick={this.deletePlan.bind(this)}href="">Delete Meal Plan</a>
        </div>
    }
    if (this.data.subscriptionLoading) {
      return (<Loading />)
    }
    else {
      if (this.data.weekPlan){
        return (
          <Content>
            <WeekPlan weekPlan={this.data.weekPlan} />
            {adminButtons}
          </Content>
        );
      }
      else {
        return (
          <div className='centering-container'>
          You don't have any meal plans yet.
          {adminButtons}
          </div>
        );
      }
    }
  }
}

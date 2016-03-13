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

  handleClick = () => {
    this.refs.onoffswitch.checked = !this.refs.onoffswitch.checked;
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
          <Content>
            <div className="center">
              <h3>Welcome to Eat This Alpha</h3>
              <div onClick={this.handleClick.bind(this)} className="onoffswitch">
                  <input ref="onoffswitch" type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch"/>
                  <label className="onoffswitch-label" for="myonoffswitch">
                      <span className="onoffswitch-inner"></span>
                      <span className="onoffswitch-switch"></span>
                  </label>
              </div>
            </div>
          </Content>
        );
      }
    }
  }
}

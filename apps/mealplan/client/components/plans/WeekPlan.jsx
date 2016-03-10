import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class WeekPlan extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('weeksRecipes', this.props.weekPlan.meals);

    return {
      subscriptionLoading: !subscription.ready(),
      recipes: Recipes.find().fetch()
    };
  }

  render() {
    if (this.data.subscriptionLoading) {
      return (
        <div>Week plan goes here.</div>
      )
    }
    else {
      console.log(this.data.recipes);
      return (
        <div></div>
      )
    }
  }
}

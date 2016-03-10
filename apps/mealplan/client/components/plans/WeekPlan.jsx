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
      let self = this;
      let mealData = this.props.weekPlan.meals.map(function(meal, index) {
        let mealTitles = [];
        _.each(meal, function(dish) {
          let doc = _.findWhere(self.data.recipes, {_id: dish});
          mealTitles.push(<div>{doc.title}</div>);
        })
        console.log(mealTitles);
        return (
          <div className="meal-container">
            Meal {index+1}
            {mealTitles}
          </div>
        )
      })
      return (
        <div>{mealData}</div>
      )
    }
  }
}

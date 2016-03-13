import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Loading from '../Loading';
import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class WeekPlan extends Component {

  static propTypes = {
    weekPlan: React.PropTypes.object.isRequired,
  }

  getMeteorData() {
    let subscription = Meteor.subscribe('getPlanRecipes', this.props.weekPlan.meals);
    return {
      subscriptionLoading: !subscription.ready(),
      recipes: Recipes.find().fetch()
    };
  }

  render() {
    if (this.data.subscriptionLoading) {
      return (
        <div>
        <Loading />
        </div>
      )
    }
    else {
      let self = this;
      let mealData = this.props.weekPlan.meals.map(function(meal, index) {
        let mealTitles = [];
        _.each(meal, function(dish, index) {
          let doc = _.findWhere(self.data.recipes, {_id: dish});
          mealTitles.push(<div key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})}>{doc.title}</a></div>);
        })
        return (
          <div key={'meal'+index} className="meal-container">
            <h3 className="meal-heading">
            Dinner {index+1}
            </h3>
            <div className="meal-titles">
            {mealTitles}
            </div>
          </div>
        )
      })
      return (
        <div>
        <div>{mealData}</div>
        </div>
      )
    }
  }
}
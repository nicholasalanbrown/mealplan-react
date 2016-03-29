import { Component, PropTypes } from 'react';

import Loading from '../Loading';
import Recipes from 'mealplan/collections/Recipes';

export default class WeekPlan extends Component {

  static propTypes = {
    plan: React.PropTypes.object.isRequired,
    showPlan: React.PropTypes.bool.isRequired
  }

  render() {
      let self = this;
      let mealData = this.props.plan.meals.map(function(meal, index) {
        let mealTitles = [];
        _.each(meal, function(dish, index) {
          let doc = _.findWhere(self.props.recipes, {_id: dish});
          mealTitles.push(<div key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})}>{doc.title}</a></div>)
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
      let recipeIds = [];
      let recipeList = this.props.plan.meals.map(function(meal, index) {
        _.each(meal, function(dish, index) {
          let doc = _.findWhere(self.props.recipes, {_id: dish});
          recipeIds.push(doc._id);
        })
      });
      let uniqueIds = _.uniq(_.values(recipeIds));
      let recipeLinks = [];
      uniqueIds.map(function(recipe, index) {
          let doc = _.findWhere(self.props.recipes, {_id: recipe});
          recipeLinks.push(<div key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})}>{doc.title}</a></div>);
      })
      return (
        <div>
          <div>{this.props.showPlan ? mealData : recipeLinks}</div>
        </div>
      )
    }
}

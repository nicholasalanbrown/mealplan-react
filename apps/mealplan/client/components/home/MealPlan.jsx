import { Component, PropTypes } from 'react';

import Loading from '../Loading';
import Recipes from 'mealplan/collections/Recipes';

export default class MealPlan extends Component {

  static propTypes = {
    plan: React.PropTypes.object.isRequired
  }

  render() {
      let self = this;
      let mealPlan = this.props.plan.meals.map(function(meal, index) {
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
      return (
        <div>
          <div>{mealPlan}</div>
        </div>
      )
    }
}

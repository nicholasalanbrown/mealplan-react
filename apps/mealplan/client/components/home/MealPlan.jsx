import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_meal_plan.import.scss';

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
          mealTitles.push(
            <div className="pure-u-7-24" styleName="dish-container" key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})} styleName="meal-title">{doc.title}</a></div>
          )
        })
        return (
          <div key={'meal'+index}>
            <div className="pure-g" styleName="meal-container">
            <div className='pure-u-2-24' styleName='index-container'>{index+1}</div>
            {mealTitles}
            </div>
          </div>
        )
      })
      return (
        <div>
          <div>
            <h3 styleName="meal-heading">
              Dinners
            </h3>
            <div styleName='plan-container'>
              {mealPlan}
            </div>
          </div>
        </div>
      )
    }
}

export default CSSModules(MealPlan, styles);

import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_recipe_plan.import.scss';

export default class RecipePlan extends Component {

  static propTypes = {
    plan: React.PropTypes.object.isRequired
  }

  render() {
      let self = this;
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
          recipeLinks.push(<div styleName='row' key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})} styleName="recipe-link">{doc.title}</a></div>);
      })
      return (
        <div>
          <h3 styleName='meal-heading'>
            Dinners
          </h3>
          <div>{recipeLinks}</div>
        </div>
      )
    }
}

export default CSSModules(RecipePlan, styles);

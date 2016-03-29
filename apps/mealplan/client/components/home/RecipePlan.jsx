import { Component, PropTypes } from 'react';

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
          recipeLinks.push(<div key={'dish'+index}><a href={FlowRouter.path('viewRecipe', {recipeId: doc._id})}>{doc.title}</a></div>);
      })
      return (
        <div>
          <div>{recipeLinks}</div>
        </div>
      )
    }
}

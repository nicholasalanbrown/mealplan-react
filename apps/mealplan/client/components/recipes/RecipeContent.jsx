import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';

import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class RecipeContent extends Component {

  getMeteorData() {
    Meteor.subscribe('singleRecipe', this.props.recipeId);
    const recipe = Recipes.find().fetch();
    return {
      recipe
    };
  }

  render() {
    let recipe = this.data.recipe[0]
    if (this.data.recipe.length > 0) {
    return (
      <Content>
        <h1>{recipe.title}</h1>
      </Content>
    );
    }
    else {
      return <div></div>
    }
  }
}

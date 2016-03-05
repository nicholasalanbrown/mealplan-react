import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import RecipeRow from './RecipeRow';

import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class RecipeList extends Component {

  getMeteorData() {
    Meteor.subscribe('allRecipes');
    const recipes = Recipes.find().fetch();
    return {
      recipes
    };
  }

  render() {
    var recipeRows = this.data.recipes.map(function(recipe) {
      return (
        <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id}/>
      );
    });
    return (
      <Content>
        <h1>Recipes</h1>
        {recipeRows}
      </Content>
    );
  }
}

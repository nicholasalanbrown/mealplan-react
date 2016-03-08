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
    const fullRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'full') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id}/>
      }
      else {
        return null;
      }
    });

    const mainRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'main') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id}/>
      }
      else {
        return null;
      }
    });

    const sideRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'side') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id}/>
      }
      else {
        return null;
      }
    });

    return (
      <Content>
        <h1>Recipes</h1>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Full meals</th>
            </tr>
          </thead>
          <tbody>
            {fullRecipeRows}
          </tbody>
        </table>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Mains</th>
            </tr>
          </thead>
          <tbody>
            {mainRecipeRows}
          </tbody>
        </table>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Sides</th>
            </tr>
          </thead>
          <tbody>
            {sideRecipeRows}
          </tbody>
        </table>
      </Content>
    );
  }
}

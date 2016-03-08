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
    const fullCount = Recipes.find({type: 'full'}).count();
    const mainCount = Recipes.find({type: 'main'}).count();
    const sideCount = Recipes.find({type: 'side'}).count();
    return {
      recipes,
      fullCount,
      mainCount,
      sideCount
    };
  }

  render() {
    console.log(this.data.mainCount);
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
              <th>Full meals ({this.data.fullCount})</th>
            </tr>
          </thead>
          <tbody>
            {fullRecipeRows}
          </tbody>
        </table>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Mains ({this.data.mainCount})</th>
            </tr>
          </thead>
          <tbody>
            {mainRecipeRows}
          </tbody>
        </table>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Sides ({this.data.sideCount})</th>
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

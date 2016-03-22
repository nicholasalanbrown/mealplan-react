import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import Loading from '../Loading';
import RecipeRow from './RecipeRow';

import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class RecipeList extends Component {

  getMeteorData() {
    const subscription = Meteor.subscribe('allRecipes');
    const recipes = Recipes.find().fetch();
    const recipeCount = Recipes.find().count();
    const fullCount = Recipes.find({type: 'full'}).count();
    const mainCount = Recipes.find({type: 'main'}).count();
    const sideCount = Recipes.find({type: 'side'}).count();
    return {
      subscriptionLoading: !subscription.ready(),
      recipes,
      recipeCount,
      fullCount,
      mainCount,
      sideCount
    };
  }

  render() {
    const fullRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'full') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id} servings={recipe.servings}/>
      }
      else {
        return null;
      }
    });

    const mainRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'main') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id} servings={recipe.servings}/>
      }
      else {
        return null;
      }
    });

    const sideRecipeRows = this.data.recipes.map(function(recipe) {
      if (recipe.type === 'side') {
        return <RecipeRow title={recipe.title} key={recipe._id} recipeId={recipe._id} servings={recipe.servings}/>
      }
      else {
        return null;
      }
    });
    if (this.data.subscriptionLoading) {
      return <Loading />
    }
    else {
      return (
        <Content>
          <h1>Recipes ({this.data.recipeCount})</h1>
          <table className="pure-table">
            <thead>
              <tr>
                <th>Full meals ({this.data.fullCount})</th>
                <th>Servings</th>
                <th></th>
                <th></th>
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
                <th>Servings</th>
                <th></th>
                <th></th>
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
                <th>Servings</th>
                <th></th>
                <th></th>
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
}

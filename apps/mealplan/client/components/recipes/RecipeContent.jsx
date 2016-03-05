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

      var recipeIngredients = recipe.ingredients.map(function(ingredient, index) {
        let quantity, measurement;
        if (ingredient.quantity) {
          quantity = ingredient.quantity+" ";
        }
        if (ingredient.measurement) {
          measurement = ingredient.measurement+" ";
        }
        return (
          <li key={index}>{quantity}{measurement}{ingredient.name}</li>
        );
      });

      var recipeInstructions = recipe.instructions.map(function(instruction, index) {
        return (
          <li key={index}>{instruction}</li>
        );
      });
    return (
      <Content>
        <h1>{recipe.title}</h1>
        <ul>
          {recipeIngredients}
        </ul>
        <ol>
          {recipeInstructions}
        </ol>
      </Content>
    );
    }
    else {
      return <div></div>
    }
  }
}

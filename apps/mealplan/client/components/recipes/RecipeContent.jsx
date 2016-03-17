import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import Loading from '../Loading';

import Recipes from 'mealplan/collections/Recipes';

@ReactMixin.decorate(ReactMeteorData)
export default class RecipeContent extends Component {

  getMeteorData() {
    var subscription = Meteor.subscribe('singleRecipe', this.props.recipeId);
    return {
      subscriptionLoading: !subscription.ready(), // Use handle to show loading state
      recipe: Recipes.find().fetch(),
    };
  }

  render() {
    if (this.data.subscriptionLoading) {
      return <Loading />
    }
    else {
      let recipe = this.data.recipe[0];
      var recipeIngredients = recipe.ingredients.map(function(ingredient, index) {
        let quantity, measurement;
        if (ingredient.quantity) {
          quantity = ingredient.quantity+' ';
        }
        if (ingredient.measurement) {
          measurement = ingredient.measurement+' ';
        }
        return (
          <li key={index}>{quantity}{measurement}{quantity > 1 && ingredient.pluralName ? ingredient.pluralName : ingredient.listName}</li>
        );
      });

      var recipeInstructions = recipe.instructions.map(function(instruction, index) {
        return (
          <li key={index}>{instruction}</li>
        );
      });
    return (
        <div className="recipe-content-container">
          <div className="recipe-hero">
            <Content>
              <h2>{recipe.title}</h2>
            </Content>
          </div>
          <Content>
            <div className="recipe-meta">Servings: {recipe.servings}</div>
            <ul >
              {recipeIngredients}
            </ul>
            <ol className="instruction-list">
              {recipeInstructions}
            </ol>
          </Content>
        </div>
    );
    }
  }
}

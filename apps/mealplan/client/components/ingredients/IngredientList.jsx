import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import IngredientRow from './IngredientRow';

import Ingredients from 'mealplan/collections/Ingredients';

@ReactMixin.decorate(ReactMeteorData)
export default class IngredientList extends Component {

  getMeteorData() {
    Meteor.subscribe('allIngredients');
    const ingredients = Ingredients.find().fetch();
    return {
      ingredients
    };
  }

  render() {
    var ingredientRows = this.data.ingredients.map(function(ingredient) {
      return (
        <IngredientRow name={ingredient.name} key={ingredient._id} ingredientId={ingredient._id}/>
      );
    });
    return (
      <Content>
        <h1>Ingredients</h1>
        {ingredientRows}
      </Content>
    );
  }
}
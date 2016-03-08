import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import IngredientRow from './IngredientRow';

import Ingredients from 'mealplan/collections/Ingredients';

@ReactMixin.decorate(ReactMeteorData)
export default class IngredientList extends Component {

  getMeteorData() {
    Meteor.subscribe('allIngredients');
    const ingredients = Ingredients.find({}, {sort: {listName: 1}}).fetch();
    return {
      ingredients
    };
  }

  render() {
    let self=this;
    var ingredientRows = this.data.ingredients.map(function(ingredient) {
      return (
        <IngredientRow ingredientId={ingredient._id} name={ingredient.listName} key={ingredient._id} ingredientId={ingredient._id}/>
      );
    });
    return (
      <Content>
        <h1>Ingredients</h1>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {ingredientRows}
          </tbody>
        </table>
      </Content>
    );
  }
}

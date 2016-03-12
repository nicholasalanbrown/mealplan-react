import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import Loading from '../Loading';
import IngredientRow from './IngredientRow';

import Ingredients from 'mealplan/collections/Ingredients';

@ReactMixin.decorate(ReactMeteorData)
export default class IngredientList extends Component {

  getMeteorData() {
    const subscription = Meteor.subscribe('allIngredients');
    const ingredients = Ingredients.find({}, {sort: {listName: 1}}).fetch();
    return {
      subscriptionLoading: !subscription.ready(),
      ingredients
    };
  }

  render() {
    if (this.data.subscriptionLoading) {
      return <Loading />
    }
    else {
      let self=this;
      var ingredientRows = this.data.ingredients.map(function(ingredient) {
        return (
          <IngredientRow ingredientId={ingredient._id} name={ingredient.listName} pluralName={ingredient.pluralName} key={ingredient._id} ingredientId={ingredient._id}/>
        );
      });
      return (
        <Content>
          <h1>Ingredients</h1>
          <table className="pure-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Plural Name</th>
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
}

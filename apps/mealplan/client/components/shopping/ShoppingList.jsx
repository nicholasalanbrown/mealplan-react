import { Component, PropTypes } from 'react';

export default class ShoppingList extends Component {

  static propTypes = {
    weekPlan: React.PropTypes.object.isRequired,
  }

  render() {
  console.log(this.props.weekPlan);
  let ingredientList =
    this.props.weekPlan.shoppingList.map(function (ingredient) {
      let measurement = ingredient.measurement ? ingredient.measurement : '';
      return <li>{`${ingredient.quantity} ${measurement} ${ingredient.listName}`}</li>;
    });
  ;
      return (
        <div>
          <ul>
          {ingredientList}
          </ul>
        </div>
      )
    }
}

import { Component, PropTypes } from 'react';

export default class ShoppingList extends Component {

  static propTypes = {
    weekPlan: React.PropTypes.object.isRequired,
  }

  render() {
  console.log(this.props.weekPlan);
  let ingredientList =
    this.props.weekPlan.shoppingList.map(function (ingredient) {
      return <li>{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.listName}`}</li>;
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

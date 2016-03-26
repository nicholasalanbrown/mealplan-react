import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_shopping_list.import.scss';

export default class ShoppingList extends Component {

  static propTypes = {
    weekPlan: React.PropTypes.object.isRequired,
  }

  render() {
  let ingredientList =
    this.props.weekPlan.shoppingList.map(function (ingredient) {
      let measurement = ingredient.measurement ? ingredient.measurement : '';
      return <li styleName='list-item'>{`${ingredient.quantity} ${measurement} ${ingredient.listName}`}</li>;
    });
  ;
      return (
        <div styleName='card'>
          <h3>Shopping List</h3>
          <ul>
          {ingredientList}
          </ul>
        </div>
      )
    }
}

export default CSSModules(ShoppingList, styles);

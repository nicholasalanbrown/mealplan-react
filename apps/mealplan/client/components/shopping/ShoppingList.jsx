import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_shopping_list.import.scss';

export default class ShoppingList extends Component {

  static propTypes = {
    plan: React.PropTypes.object.isRequired,
  }

  render() {
  let ingredientList =
    this.props.plan.shoppingList.map(function (ingredient) {
      let measurement = ingredient.measurement ? ingredient.measurement : '';
      return <li styleName='list-item'>{`${ingredient.quantity} ${measurement} ${ingredient.listName}`}</li>;
    });
  ;
      return (
        <div styleName='card'>
          <h4>Shopping List</h4>
          <ul>
          {ingredientList}
          </ul>
        </div>
      )
    }
}

export default CSSModules(ShoppingList, styles);

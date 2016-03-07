import { Component, PropTypes } from 'react';

export default class IngredientRow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
      </tr>
    );
  }
}

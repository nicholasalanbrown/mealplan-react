import { Component, PropTypes } from 'react';

export default class IngredientRow extends Component {

  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
}

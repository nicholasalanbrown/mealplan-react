import { Component, PropTypes } from 'react';

export default class RecipeList extends Component {

  render() {
    return (
      <p>{this.props.title}</p>
    );
  }
}

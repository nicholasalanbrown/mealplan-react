import { Component, PropTypes } from 'react';

export default class RecipeList extends Component {

  render() {
    console.log(this.props.key);
    return (
      <tr>
        <td><a href={FlowRouter.path('viewRecipe', {recipeId: this.props.recipeId})}>{this.props.title}</a></td>
      </tr>
    );
  }
}

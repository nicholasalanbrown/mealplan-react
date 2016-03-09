import { Component, PropTypes } from 'react';

export default class RecipeList extends Component {


  deleteRecipe = (e) => {
    Meteor.call('deleteRecipe', this.props.recipeId);
  }

  render() {
    return (
      <tr>
        <td><a href={FlowRouter.path('viewRecipe', {recipeId: this.props.recipeId})}>{this.props.title}</a></td><td><a href="" onClick={this.deleteRecipe.bind(this)}><i className="fa fa-trash"/></a></td>
      </tr>
    );
  }
}

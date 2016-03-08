import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class IngredientRow extends Component {

  state = {
      editing: false
  }

  handleBlur = (e) => {
      Meteor.call('updateIngredient', this.props.ingredientId, e.target.value)
      this.setState({editing: !this.state.editing})
  }

  handleClick = (e) => {
      this.setState({editing: !this.state.editing})
  }

  render() {
    if (this.state.editing) {
      return (
        <tr>
          <td><input ref="nameInput" className="pure-input" onBlur={this.handleBlur.bind(this)} defaultValue={this.props.name} autoFocus={true} /></td><td>---</td>
        </tr>
      );
    }
    else {
      return (
        <tr>
          <td onClick={this.handleClick.bind(this)}>{this.props.name}</td><td>---</td>
        </tr>
      )
    }
  }
}

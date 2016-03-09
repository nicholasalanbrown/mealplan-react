import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class IngredientRow extends Component {

  state = {
      nameEditing: false,
      pluralNameEditing: false
  }

  handleNameBlur = (e) => {
      Meteor.call('updateIngredient', this.props.ingredientId, 'name', e.target.value)
      this.setState({nameEditing: !this.state.nameEditing})
  }

  handleNameClick = (e) => {
      this.setState({nameEditing: !this.state.nameEditing})
  }

  handlePluralNameBlur = (e) => {
      Meteor.call('updateIngredient', this.props.ingredientId, 'pluralName', e.target.value)
      this.setState({pluralNameEditing: !this.state.pluralNameEditing})
  }

  handlePluralNameClick = (e) => {
      this.setState({pluralNameEditing: !this.state.pluralNameEditing})
  }

  render() {
    let nameInput;
    let pluralNameInput;

    if (this.state.nameEditing) {
      nameInput = <td><input ref="nameInput" className="pure-input" onBlur={this.handleNameBlur.bind(this)} defaultValue={this.props.name} autoFocus={true} /></td>;
    }
    else {
      nameInput = <td onClick={this.handleNameClick.bind(this)}>{this.props.name}</td>
    }

    if (this.state.pluralNameEditing) {
      pluralNameInput = <td><input ref="pluralNameInput" className="pure-input" onBlur={this.handlePluralNameBlur.bind(this)} defaultValue={this.props.pluralName ? this.props.pluralName : ''} autoFocus={true} /></td>;
    }
    else {
      pluralNameInput = <td onClick={this.handlePluralNameClick.bind(this)}>{this.props.pluralName ? this.props.pluralName : '---'}</td>
    }
    return (
      <tr>
      {nameInput}
      {pluralNameInput}
      </tr>
    )
  }
}

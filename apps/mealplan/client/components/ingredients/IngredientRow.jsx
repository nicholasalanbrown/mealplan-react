import { Component, PropTypes } from 'react';

export default class IngredientRow extends Component {

  state = {
      newName: '',
      editing: false
  }

  handleBlur = (e) => {
    console.log(e.target.value);
    /*
      Meteor.call('updateIngredient', this.props._id, e.target.value)
      this.setState({editing: !this.state.editing})
    */
  }

  handleClick = (e) => {
      this.setState({editing: !this.state.editing})
  }


  render() {
    if (this.state.editing) {
      return (
        <tr>
          <td><input className="pure-input" onBlur={this.handleBlur.bind(this)} value={this.state.name} /></td>
        </tr>
      );
    }
    else {
      return (
        <tr>
          <td onClick={this.handleClick.bind(this)}>{this.props.name}</td>
        </tr>
      )
    }
  }
}


import { Component, PropTypes } from 'react';

export default class OptionTemplate extends Component {


  render() {
    var bgColor = null;

    // If this option is currently selected, render it with a green background.
    if (this.props.isSelected) {
        bgColor = {
            color: 'green'
        };
    }
      return (
        <div style={bgColor}>
            <p>My name is {this.props.data.name}!</p>
        </div>
      );
    }
}

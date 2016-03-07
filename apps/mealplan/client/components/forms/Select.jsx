import { Component } from 'react';

export default class Select extends Component {
  render() {
    let options = this.props.options.map(function(option, index) {
      return (
        <option key={index} value={options}>{option}</option>
      );
    });
    return (
      <select>
        {options}
      </select>
    );
  }
};

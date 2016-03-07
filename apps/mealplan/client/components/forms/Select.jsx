import { Component } from 'react';

export default class Select extends Component {
  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }
  render() {
    let self = this;
    let options = this.props.options.map(function(option, index) {
      return (
        <option key={index} value={options}>{option}</option>
      );
    });
    return (
      <select onChange={this.handleChange.bind(this)} className={this.props.className}>
        <option value="" disabled selected>Select</option>
        {options}
      </select>
    );
  }
};

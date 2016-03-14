import { Component } from 'react';

export default class Menu extends Component {

  render() {
    return (
      <div className="menu">
        <div className={(this.props.visible ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
      </div>
    );
  }
};

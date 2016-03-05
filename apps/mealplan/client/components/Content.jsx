import { Component, PropTypes } from 'react';

export default class Content extends Component {

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-2-24"></div>
        <div className="pure-u-20-24">
          {this.props.children}
        </div>
        <div className="pure-u-2-24"></div>
      </div>
    );
  }
}

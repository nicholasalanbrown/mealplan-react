import { Component, PropTypes } from 'react';

export default class Content extends Component {

  render() {
    return (
      <div className="pure-g content-wrapper">
        <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
        <div className="pure-u-22-24 pure-u-md-20-24 pure-u-lg-16-24">
          {this.props.children}
        </div>
        <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
      </div>
    );
  }
}

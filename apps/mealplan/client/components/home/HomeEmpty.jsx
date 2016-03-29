import { Component, PropTypes } from 'react';

export default class HomeEmpty extends Component {

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-24 pure-u-md-4-24 pure-u-lg-6-24"></div>
        <div className="pure-u-22-24 pure-u-md-16-24 pure-u-lg-12-24">
          <h4 className="weekplan-empty">You don't have a meal plan yet. Your first plan will appear here this Sunday.</h4>
        </div>
      </div>
    );
  }
}

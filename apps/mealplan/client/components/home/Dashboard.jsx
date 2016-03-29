import { Component, PropTypes } from 'react';

import WeekPlan from '../plans/WeekPlan';
import ShoppingList from '../shopping/ShoppingList';

export default class Dashboard extends Component {

  state = {
    showPlan: true
  }

  render() {
    return (
      <div>
        <div className="pure-u-24-24 pure-u-md-15-24 pure-u-lg-15-24">
            <WeekPlan plan={this.props.plan} recipes={this.props.recipes} showPlan={this.state.showPlan}/>
          </div>
        <div className="pure-u-1-24 pure-u-md-1-24 pure-u-lg-1-24"></div>
        <div className="pure-u-24-24 pure-u-md-8-24 pure-u-lg-8-24">
            <ShoppingList plan={this.props.plan} />
        </div>
      </div>
    );
  }
}

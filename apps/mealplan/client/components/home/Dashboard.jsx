import { Component, PropTypes } from 'react';

import MealPlan from '../home/MealPlan';
import RecipePlan from '../home/RecipePlan';
import ShoppingList from '../shopping/ShoppingList';

export default class Dashboard extends Component {

  state = {
    showPlan: true
  }

  render() {
    return (
      <div>
        <div className="pure-u-24-24 pure-u-md-15-24 pure-u-lg-15-24">
            {this.state.showPlan ?
            <MealPlan plan={this.props.plan} recipes={this.props.recipes} />
            :
            <RecipePlan plan={this.props.plan} recipes={this.props.recipes} />}
          </div>
        <div className="pure-u-1-24 pure-u-md-1-24 pure-u-lg-1-24"></div>
        <div className="pure-u-24-24 pure-u-md-8-24 pure-u-lg-8-24">
            <ShoppingList plan={this.props.plan} />
        </div>
      </div>
    );
  }
}

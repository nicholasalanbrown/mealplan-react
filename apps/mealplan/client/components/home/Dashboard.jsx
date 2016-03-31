import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import MealPlan from '../home/MealPlan';
import RecipePlan from '../home/RecipePlan';
import ShoppingList from '../shopping/ShoppingList';

import styles from '../../styles/modules/home/_dashboard.import.scss';

export default class Dashboard extends Component {

  state = {
    showPlan: true
  }

  toggleView () {
    this.setState({showPlan: !this.state.showPlan})
  }

  render() {
    return (
      <div>
        <div className="pure-u-24-24 pure-u-md-15-24 pure-u-lg-15-24" styleName='left-container'>
            <i onClick={this.toggleView.bind(this)} className="fa fa-calendar-o" styleName={this.state.showPlan ? 'active-calendar': 'calendar'}/>
            <i onClick={this.toggleView.bind(this)} className="fa fa-list" styleName={this.state.showPlan ? 'list': 'active-list'} />
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

export default CSSModules(Dashboard, styles);

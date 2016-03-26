import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_meal_plan.import.scss';

export default class MealPlan extends Component {

  render() {
    return (
        <div styleName='card'>
           <h4>{moment().startOf('week').format('MMMM Do')} - {moment().endOf('week').format('MMMM Do YYYY')}</h4>
        </div>
    );
  }
}

export default CSSModules(MealPlan, styles);

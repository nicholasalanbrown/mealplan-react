import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_card.import.scss';

export default class HomeCard extends Component {

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{this.props.title}</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

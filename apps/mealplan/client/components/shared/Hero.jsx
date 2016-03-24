import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/_hero.import.scss';

export default class Hero extends Component {

  render() {
    return (
      <div styleName='hero'>
        {this.props.children}
      </div>
    );
  }
}

export default CSSModules(Hero, styles);

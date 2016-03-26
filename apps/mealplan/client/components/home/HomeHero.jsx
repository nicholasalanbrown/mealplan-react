import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_home_hero.import.scss';

export default class HomeHero extends Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div styleName='hero'>
        <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
        <div className="pure-u-22-24 pure-u-md-20-24 pure-u-lg-16-24">
          <h3 styleName='welcome-text'>Welcome, {this.props.name}</h3>
          </div>
          <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
      </div>
    );
  }
}

export default CSSModules(HomeHero, styles);

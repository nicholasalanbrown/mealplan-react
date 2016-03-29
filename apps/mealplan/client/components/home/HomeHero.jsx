import { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../../styles/modules/home/_home_hero.import.scss';

export default class HomeHero extends Component {

  static propTypes = {
    name: React.PropTypes.string
  }

  render() {
    let name;
    if (this.props.name) {
      name = `Welcome, ${this.props.name}`;
    }
    return (
      <div styleName='hero'>
        <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
        <div className="pure-u-22-24 pure-u-md-20-24 pure-u-lg-16-24">
          <h2 styleName='welcome-text'>{name}</h2>
          </div>
          <div className="pure-u-1-24 pure-u-md-2-24 pure-u-lg-4-24"></div>
      </div>
    );
  }
}

export default CSSModules(HomeHero, styles);

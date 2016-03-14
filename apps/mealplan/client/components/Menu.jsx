import { Component } from 'react';
import BodyClassName  from 'react-body-classname';

export default class Menu extends Component {

  render() {
    let bodyNoScroll;
    if (this.props.visible) {
      bodyNoScroll = <BodyClassName className='body-no-scroll' />
    }
    return (
      <div className="menu">
        {bodyNoScroll}
        <div className={(this.props.visible ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
      </div>
    );
  }
};

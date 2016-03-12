import { Component, PropTypes } from 'react';
import Loader from 'halogen/PulseLoader';

export default class Loading extends Component {

  render() {
    return (
        <div className="centering-container">
          <Loader color="#9AC6EC" size="16px" margin="4px"/>
        </div>
    );
  }
}

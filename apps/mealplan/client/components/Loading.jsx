import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Loader from 'halogen/PulseLoader';
import TimerMixin from 'react-timer-mixin';

@ReactMixin.decorate(TimerMixin)
export default class Loading extends Component {

  state = {
    timePassed: false
  }

  componentDidMount() {
    this.setTimeout( () => {
       this.setTimePassed();
    }, 500);
  }

  setTimePassed() {
     this.setState({timePassed: true});
  }

  render() {

    if (this.state.timePassed) {
      return (
        <div className="centering-container">
          <Loader color="#9AC6EC" size="16px" margin="4px"/>
        </div>
      )
    }
    else {
      return (
          <div className="centering-container">
          </div>
      );
    }
  }
}

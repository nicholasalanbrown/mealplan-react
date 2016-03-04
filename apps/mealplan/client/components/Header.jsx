import { Component, PropTypes } from 'react';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';
import 'mealplan/client/css/TodoApp.import.css'

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {

  render() {
    let form = null;

    if (Meteor.userId()) {
      form = (
        <form className="newTask" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="text" placeholder="Type to add new tasks" />
        </form>
      );
    }

    return (
      <header>
        <ul>
          <li><a href="/">Meal Plan</a></li>
          <li><a href="/other">Other Page</a></li>
        </ul>
      </header>
    );
  }
}

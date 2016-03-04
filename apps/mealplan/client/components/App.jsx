import { Component } from 'react';
import ReactMixin from 'react-mixin';

import Header from './Header';

import Cuisines from 'mealplan/collections/Cuisines';
import 'mealplan/client/css/TodoApp.import.css'

@ReactMixin.decorate(ReactMeteorData)
export default class App extends Component {

  getMeteorData() {
    Meteor.subscribe('allCuisines');

    const cuisines = Cuisines.find().fetch();
    return {
      cuisines,
      user: Meteor.user()
    };
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.content}
      </div>
    );
  }
};

import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

import Cuisines from 'mealplan/collections/Cuisines';
import 'mealplan/client/css/TodoApp.import.css'

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  getMeteorData() {
    Meteor.subscribe('allCuisines');

    const cuisines = Cuisines.find().fetch();
    console.log(cuisines);
    return {
      cuisines,
      user: Meteor.user()
    };
  }

  render() {
    return (
        <div className="container">
          <TodoHeader
          />
        </div>
    );
  }
};

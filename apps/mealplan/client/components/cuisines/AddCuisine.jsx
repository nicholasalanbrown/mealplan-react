import { Component, PropTypes } from 'react';

import Content from '../Content';

import Cuisines from 'mealplan/collections/Cuisines';

export default class AddCuisine extends Component {

  state = {
    newCuisine: ''
  }

  handleChange = (e) => {
    let name = e.target.value;
    this.setState({newCuisine: name});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newCuisine = this.state.newCuisine;
    Meteor.call('addCuisine', newCuisine, function(error, result) {
      if(error) {
        console.log(error)
      }
      else {
        FlowRouter.go('home');
      }
    });
  }

  render() {
      return (
        <Content>
            <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add a Cuisine</legend>
                    <input name='cuisineInput' onChange={this.handleChange.bind(this)} type="text" value={this.state.newCuisine} placeholder="New cuisine" />
                    <button type="submit" className="pure-button pure-button-primary">Add Cuisine</button>
                </fieldset>
            </form>
        </Content>
      );
    }
}

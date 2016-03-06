import { Component, PropTypes } from 'react';

import Content from '../Content';

import Recipes from 'mealplan/collections/Recipes';

export default class addIngredient extends Component {
  state = {
    name: ''
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.state.name;
    let self = this;
    Meteor.call('addIngredient', name, function(error, result) {
      if(error) {
        console.log(error)
      }
      else {
        self.setState({ name: '' });
        FlowRouter.go('listIngredients');
      }
    });
  }

  render() {
    return (
      <Content>
          <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
              <fieldset>
                  <legend>Add an Ingredient</legend>
                  <label for="name">Name</label>
                  <input onChange={this.handleNameChange} id="name" type="text" value={this.state.name} placeholder="Name" />
                  <button type="submit" className="pure-button pure-button-primary">Sign in</button>
              </fieldset>
          </form>
      </Content>
    );
  }
}

import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Content from '../Content';

import Cuisines from 'mealplan/collections/Cuisines';

@ReactMixin.decorate(ReactMeteorData)
export default class AddRecipe extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('allCuisines');
    return {
      subscriptionLoading: !subscription.ready(), // Use handle to show loading state
      cuisines: Cuisines.find().fetch(),
    };
  }

  state = {
    recipeDoc: {}
  };

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let recipeDoc = this.state.recipeDoc;
    recipeDoc[name] = value;
    this.setState({ recipeDoc: recipeDoc });
    console.log(this.state.recipeDoc);
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
    if (this.data.subscriptionLoading) {
      return <div></div>
    }
    else {
      let cuisineOptions = this.data.cuisines.map(function(cuisine, index) {
        return (
          <option key={index}>{cuisine.name}</option>
        );
      });
      let servingOptions = [1,2,3,4,5,6,7,8,9,10].map(function(number, index) {
        return (
          <option key={index} value={Number(number)}>{Number(number)}</option>
        );
      });
      return (
        <Content>
            <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add a Recipe</legend>
                    <label for="title">Title</label>
                    <input onChange={this.handleChange.bind(this)} name="title" type="text" value={this.state.title} placeholder="Title" />
                    <label for="cuisine">Cuisine</label>
                    <select name="cuisine">
                      {cuisineOptions}
                    </select>
                    <select name="servings" onChange={this.handleChange.bind(this)}>
                      {servingOptions}
                    </select>
                    <button type="submit" className="pure-button pure-button-primary">Sign in</button>
                </fieldset>
            </form>
        </Content>
      );
    }
  }
}

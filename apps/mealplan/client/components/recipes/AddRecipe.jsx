import { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';
import ReactMixin from 'react-mixin';

import Content from '../Content';

import Cuisines from 'mealplan/collections/Cuisines';
import Ingredients from 'mealplan/collections/Ingredients';


@ReactMixin.decorate(ReactMeteorData)
export default class AddRecipe extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('allCuisines');
    let ingredientSubscription = Meteor.subscribe('allIngredients');
    return {
      subscriptionLoading: !subscription.ready() || !ingredientSubscription.ready(),
      cuisines: Cuisines.find().fetch(),
      ingredients: Ingredients.find().fetch()
    };
  }

  state = {
    recipeDoc: {},
    ingredients: [],
    cuisineOptions: [],
    searchValue: ''
  };

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let recipeDoc = this.state.recipeDoc;
    recipeDoc[name] = value;
    this.setState({ recipeDoc: recipeDoc });
  }

  handleSelect = (e) => {
    console.log(e);
    console.log(this.state.ingredients);
    let ingredients = this.state.ingredients;
    ingredients.push(e);
    this.setState({ingredients: ingredients});
    console.log(this.state);
  }

  handleSubmit = (e) => {
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
      let selectedIngredients;
      if (this.state.ingredients) {
        selectedIngredients = this.state.ingredients.map(function (ingredient, index) {
          return (
            <p>
              {ingredient}
              <input type="text" />
              <input type="text" />
            </p>);
        });
      }
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
                    <label for="servings">Number of servings</label>
                    <select name="servings" onChange={this.handleChange.bind(this)}>
                      {servingOptions}
                    </select>
                    <label for="type">Dish type</label>
                    <select name="type" onChange={this.handleChange.bind(this)}>
                      <option value="full">Full</option>
                      <option value="main">Main</option>
                      <option value="side">Side</option>
                    </select>
                    <label for="ingredientSearch">Search for ingredients</label>
                    <Typeahead
                      name="ingredientSearch"
                      options={this.data.ingredients.map(function(ingredient){
                        return ingredient.listName;
                      })}
                      maxVisible={15}
                      onOptionSelected={this.handleSelect.bind(this)}
                    />
                    {selectedIngredients}
                    <button type="submit" className="pure-button pure-button-primary">Sign in</button>
                </fieldset>
            </form>
        </Content>
      );
    }
  }
}

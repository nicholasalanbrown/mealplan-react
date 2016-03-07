import { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import Select from '../forms/Select';

import Cuisines from 'mealplan/collections/Cuisines';
import Ingredients from 'mealplan/collections/Ingredients';
import Measurements from 'mealplan/lib/measurements';

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
    instructions: [],
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
    let ingredients = this.state.ingredients;
    let ingredient = Ingredients.findOne({listName: e});
    ingredients.push({_id: ingredient._id, listName: e});
    this.setState({ingredients: ingredients});
  }

  addInstruction = (e) => {
    e.preventDefault();
    let instruction = this.refs.instructionText.value;
    let instructions = this.state.instructions;
    instructions.push(instruction);
    this.setState({instructions: instructions});
  }

  handleQuantity = (index) => {
    let ingredients = this.state.ingredients;
    let currentIngredient = ingredients[index];
    let currentQuantity = Number(this.refs['quantity'+index].value);
    if (currentQuantity > 0) {
      currentIngredient.quantity = currentQuantity;
    }
    ingredients[index] = currentIngredient;
    this.setState({ingredients: ingredients});
    console.log(this.state.ingredients);
  }

  handleMeasurement = (index, value) => {
    let ingredients = this.state.ingredients;
    let currentIngredient = ingredients[index];
    currentIngredient.measurement = value;
    ingredients[index] = currentIngredient;
    this.setState({ingredients: ingredients});
    console.log(this.state.ingredients);
  }

  handleSuffix = (index) => {
    let ingredients = this.state.ingredients;
    let currentIngredient = ingredients[index];
    let suffix = this.refs['suffix'+index].value;
    if (suffix) {
      currentIngredient.suffix = suffix;
    }
    ingredients[index] = currentIngredient;
    this.setState({ingredients: ingredients});
    console.log(this.state.ingredients);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
      let self = this;
      if (this.state.ingredients) {
        selectedIngredients = this.state.ingredients.map(function (ingredient, index) {
          return (
            <form key={"ingredientForm"+index} className="pure-form">
              <fieldset>
                <span className="form-inline">{ingredient.listName}</span>
                <input ref={'quantity'+index} onChange={self.handleQuantity.bind(this, index)} className="form-inline" placeholder="Quantity" key={"quantity"+index} type="number" name={"quantity"+index} />
                <Select ref={'measurement'+index} className="form-inline" onChange={self.handleMeasurement.bind(this, index)} key={"select"+index} options={Measurements}/>
                <input ref={'suffix'+index}className="form-inline" onChange={self.handleSuffix.bind(this, index)} placeholder="Suffix" key={"suffix"+index} type="text" name={"text"+index} />
              </fieldset>
            </form>);
        });
      }
      let instructions = "hello!";

      if (this.state.instructions) {
        instructions = this.state.instructions.map(function(instruction,index) {
        return <p>{instruction}</p>
        })
      }
      let instructionForm =
        <div>
          <textarea ref="instructionText" className="pure-u-24-24" placeholder="Enter instruction"></textarea>
          <button onClick={this.addInstruction.bind(this)} type="submit" className="pure-button pure-button-primary">Add</button>;
        </div>
      return (
        <Content>
            <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add a Recipe</legend>
                    <label for="title">Title</label>
                    <input className="pure-u-24-24" onChange={this.handleChange.bind(this)} name="title" type="text" value={this.state.title} placeholder="Title" />
                    <select className="form-inline pure-u-10-24" name="cuisine">
                      {cuisineOptions}
                    </select>
                    <select className="form-inline pure-u-6-24" name="servings" onChange={this.handleChange.bind(this)}>
                      {servingOptions}
                    </select>
                    <select className="form-inline pure-u-8-24" name="type" onChange={this.handleChange.bind(this)}>
                      <option value="full">Full</option>
                      <option value="main">Main</option>
                      <option value="side">Side</option>
                    </select>
                    <label for="ingredientSearch">Search for ingredients</label>
                    <Typeahead
                      className="pure-u-12-24"
                      name="ingredientSearch"
                      options={this.data.ingredients.map(function(ingredient){
                        return ingredient.listName;
                      })}
                      maxVisible={15}
                      onOptionSelected={this.handleSelect.bind(this)}
                    />
                    {selectedIngredients}
                    {instructions}
                    {instructionForm}
                    <button type="submit" className="pure-button pure-button-primary">Create Recipe</button>
                </fieldset>
            </form>
        </Content>
      );
    }
  }
}

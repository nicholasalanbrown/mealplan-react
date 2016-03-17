import { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';
import ReactMixin from 'react-mixin';
import math from 'mathjs';

import Content from '../Content';
import Loading from '../Loading';
import Select from '../forms/Select';

import Cuisines from 'mealplan/collections/Cuisines';
import Ingredients from 'mealplan/collections/Ingredients';
import Fractions from 'mealplan/lib/fractions';
import Measurements from 'mealplan/lib/measurements';

@ReactMixin.decorate(ReactMeteorData)
export default class AddRecipe extends Component {

  getMeteorData() {
    let subscription = Meteor.subscribe('allCuisines');
    let ingredientSubscription = Meteor.subscribe('allIngredients');
    return {
      subscriptionLoading: !subscription.ready() || !ingredientSubscription.ready(),
      cuisines: Cuisines.find({}, {sort: {name: 1}}).fetch(),
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
    if (name === 'servings') {
      recipeDoc[name] = Number(value);
    }
    else {
      recipeDoc[name] = value;
    }
    this.setState({ recipeDoc: recipeDoc });
  }

  handleSelect = (e) => {
    let ingredients = this.state.ingredients;
    let ingredient = Ingredients.findOne({listName: e});
    ingredients.push({_id: ingredient._id, listName: ingredient.listName, pluralName: ingredient.pluralName});
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
  }

  handleFraction = (index, value) => {
    let ingredients = this.state.ingredients;
    let currentIngredient = ingredients[index];
    currentIngredient.fraction = value;
    ingredients[index] = currentIngredient;
    this.setState({ingredients: ingredients});
  }

  handleMeasurement = (index, value) => {
    let ingredients = this.state.ingredients;
    let currentIngredient = ingredients[index];
    currentIngredient.measurement = value;
    ingredients[index] = currentIngredient;
    this.setState({ingredients: ingredients});
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
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('addRecipe',
      this.state.recipeDoc.title,
      this.state.recipeDoc.cuisine,
      this.state.recipeDoc.servings,
      this.state.recipeDoc.type,
      this.state.ingredients,
      this.state.instructions,
      function (error, result) {
        if (error) {
          console.log(error);
        }
        else {
          FlowRouter.go('listRecipes');
        }
      }
    )
  }

  render() {
    if (this.data.subscriptionLoading) {
      return <Loading />
    }
    else {
      let cuisineOptions = this.data.cuisines.map(function(cuisine, index) {
        return (
          <option key={'cuisine'+index}>{cuisine.name}</option>
        );
      });
      let servingOptions = [1,2,3,4,5,6,7,8,9,10].map(function(number, index) {
        return (
          <option key={'servings'+index} value={Number(number)}>{Number(number)}</option>
        );
      });
      let selectedIngredients;
      let self = this;
      if (this.state.ingredients) {
        selectedIngredients = this.state.ingredients.map(function (ingredient, index) {
          return (
            <div className="pure-form" key={'ingredientForm'+index}>
              <fieldset key={'ingredient'+index+'fieldset'}>
                <label key={'quantity'+index+'label'} for="quantity">{ingredient.listName}</label>
                <input ref={'quantity'+index} onChange={self.handleQuantity.bind(this, index)} className="form-inline pure-u-4-24" placeholder="Quantity" key={'quantity'+index} type="number" step="any" name={'quantity'+index} />
                <Select ref={'fraction'+index} onChange={self.handleFraction.bind(this, index)} className="form-inline pure-u-4-24 " key={'fraction'+index} options={Fractions} defaultValue=""/>
                <Select ref={'measurement'+index} className="form-inline pure-u-4-24 " onChange={self.handleMeasurement.bind(this, index)} key={'select'+index} options={Measurements} defaultValue=""/>
                <input ref={'suffix'+index}className="form-inline pure-u-12-24" onChange={self.handleSuffix.bind(this, index)} placeholder="Suffix" key={'suffix'+index} type="text" name={'text'+index} />
              </fieldset>
            </div>);
        });
      }
      let instructions = 'hello!';

      if (this.state.instructions) {
        instructions = this.state.instructions.map(function(instruction,index) {
        return <p index={'instruction'+index}>{instruction}</p>
        })
      }
      let instructionForm =
        <div>
          <textarea ref="instructionText" className="pure-u-24-24" placeholder="Enter instruction"></textarea>
          <button onClick={this.addInstruction.bind(this)} type="submit" className="pure-button pure-button-primary">Add</button>
        </div>
      return (
        <Content>
            <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add a Recipe</legend>
                    <label for="title">Title</label>
                    <input className="pure-u-24-24" onChange={this.handleChange.bind(this)} name="title" type="text" value={this.state.title} placeholder="Title" />
                    <select className="form-inline pure-u-24-24 pure-u-md-12-24" name="cuisine" onChange={this.handleChange.bind(this)} defaultValue="">
                      <option value="" disabled>Select</option>
                      {cuisineOptions}
                    </select>
                    <select className="form-inline pure-u-12-24 pure-u-md-6-24" name="servings" onChange={this.handleChange.bind(this)} defaultValue="">
                      <option value="" disabled>Select</option>
                      {servingOptions}
                    </select>
                    <select className="form-inline pure-u-12-24 pure-u-md-6-24" name="type" onChange={this.handleChange.bind(this)} defaultValue="">
                      <option value="" disabled>Select</option>
                      <option value="full">Full</option>
                      <option value="main">Main</option>
                      <option value="side">Side</option>
                    </select>
                    <label for="ingredientSearch">Search for ingredients</label>
                    <div className="pure-u-24-24">
                    <div className="search-container">
                    <i className="fa fa-search"></i>
                    <Typeahead
                      ref="ingredientSearch"
                      name="ingredientSearch"
                      options={this.data.ingredients.map(function(ingredient){
                        return ingredient.listName;
                      })}
                      maxVisible={15}
                      onOptionSelected={this.handleSelect.bind(this)}
                    />
                    </div>
                      </div>
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

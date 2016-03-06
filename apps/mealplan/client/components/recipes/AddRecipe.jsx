import { Component, PropTypes } from 'react';
import Typeahead from 'react-typeahead-component';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import OptionsTemplate from '../OptionsTemplate';

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
    recipeDoc: {},
    inputValue: 'fksdf'
  };

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let recipeDoc = this.state.recipeDoc;
    recipeDoc[name] = value;
    this.setState({ recipeDoc: recipeDoc });
    console.log(this.state.recipeDoc);
  }

  handleInputChange = (e) => {
    let value = e.target.value;
    this.setInputValue(value);
  }

  setInputValue = (value) => {
      this.setState({
          inputValue: value
      });
  }

  handleIngredientSearch = (e) => {

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
                    <select name="type" onChange={this.handleChange.bind(this)}>
                      <option value="full">Full</option>
                      <option value="main">Main</option>
                      <option value="side">Side</option>
                    </select>
                    <Typeahead
                      optionTemplate={OptionsTemplate}
                      inputValue={this.state.inputValue}
                      onChange={this.handleInputChange.bind(this)}
                      placeholder='Search'
                    />
                    {/*}<input onChange={this.handleIngredientSearch.bind(this)} name="ingredientSearch" type="text" placeholder="Search for an ingredient" />*/}
                    <button type="submit" className="pure-button pure-button-primary">Sign in</button>
                </fieldset>
            </form>
        </Content>
      );
    }
  }
}

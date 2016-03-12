import { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';
import fuzzy from 'fuzzy';
import ReactMixin from 'react-mixin';

import Content from '../Content';
import Loading from '../Loading';

import Recipes from 'mealplan/collections/Recipes';
import Nutrition from 'mealplan/collections/Nutrition';

@ReactMixin.decorate(ReactMeteorData)
export default class addIngredient extends Component {
  getMeteorData() {
    let subscription = Meteor.subscribe('search', this.state.searchValue);
    return {
      subscriptionLoading: !subscription.ready(),
      ingredients: Nutrition.find().fetch()
    };
  }

  state = {
    listName: '',
    databaseValue: '',
    searchValue: ''
  };

  handleSearch = (e) => {
    this.setState({searchValue: e.target.value});
  }

  handleSelect = (e) => {
    this.setState({ databaseValue: e});
  }

  handleNameChange = (e) => {
    this.setState({ listName: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let listName = this.state.listName;
    let databaseName = this.state.databaseValue;
    if (databaseName) {
      Meteor.call('addIngredient', listName, databaseName, function(error, result) {
        if(error) {
          console.log(error)
        }
        else {
          FlowRouter.go('listIngredients');
        }
      });
    }
    else {
      Meteor.call('addIngredient', listName, function(error, result) {
        if(error) {
          console.log(error)
        }
        else {
          FlowRouter.go('listIngredients');
        }
      });
    }
  }

  render() {
    if (this.data.subscriptionLoading) {
      return (<Loading />)
    }
    else {
      let results =
      this.data.ingredients.map(function(ingredient){
        return ingredient.name.long;
      });
      let resultsSorted = fuzzy.filter(this.state.searchValue, results)
      let matches = resultsSorted.map(function(el) { return el.string; });
      return (
        <Content>
            <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add an Ingredient</legend>
                    <Typeahead
                      name="ingredientSearch"
                      options={matches}
                      maxVisible={300}
                      onKeyUp={this.handleSearch.bind(this)}
                      onOptionSelected={this.handleSelect.bind(this)}
                    />
                    <label for="listName">Display name</label>
                    <input onChange={this.handleNameChange} type="text" value={this.state.listName} placeholder="Display name" />
                    <button type="submit" className="pure-button pure-button-primary">Add Ingredient</button>
                </fieldset>
            </form>
        </Content>
      );
    }
  }
}

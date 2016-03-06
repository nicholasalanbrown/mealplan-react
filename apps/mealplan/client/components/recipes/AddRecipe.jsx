import { Component, PropTypes } from 'react';

import Content from '../Content';

import Recipes from 'mealplan/collections/Recipes';

export default class AddRecipe extends Component {

  render() {
    return (
      <Content>
          <form className="pure-form pure-form-stacked">
              <fieldset>
                  <legend>Add a Recipe</legend>

                  <label for="email">Email</label>
                  <input id="email" type="email" placeholder="Email" />

                  <label for="password">Password</label>
                  <input id="password" type="password" placeholder="Password" />

                  <button type="submit" className="pure-button pure-button-primary">Sign in</button>
              </fieldset>
          </form>
      </Content>
    );
  }
}

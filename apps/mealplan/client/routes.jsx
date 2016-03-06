import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/accounts/SignIn';
import RecipeList from './components/recipes/RecipeList';
import IngredientList from './components/ingredients/IngredientList';
import RecipeContent from './components/recipes/RecipeContent';


//Global routes

FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(App, {
      content: <Home />
    });
  },
  name: 'home'
});


//Accounts

FlowRouter.route("/sign-in", {
  action: function() {
    ReactLayout.render(App, {
      content: <SignIn />
    });
  },
  name: 'signIn'
});


//Recipe routes

FlowRouter.route("/recipes", {
  action: function() {
    ReactLayout.render(App, {
      content: <RecipeList />
    });
  },
  name: "listRecipes"
});

FlowRouter.route('/add/recipe', {
    action: function(params) {
    }
})

FlowRouter.route('/recipes/:recipeId', {
  action: function(params) {
    console.log(params);
    ReactLayout.render(App, {
      content: <RecipeContent recipeId={params.recipeId}/>
    });
  },
    name: "viewRecipe"
});

FlowRouter.route('/recipes/:recipeId/edit', {
    action: function(params) {
    },
    name: "editRecipe"
});


//Ingredient routes

FlowRouter.route("/ingredients", {
  action: function() {
    ReactLayout.render(App, {
      content: <IngredientList />
    });
  },
  name: "listIngredients"
});

FlowRouter.route('/add/ingredient', {

})

FlowRouter.route('/ingredients/:ingredientId/edit', {

});


//Food routes

FlowRouter.route('/add/food', {
    action: function(params) {
    }
})

FlowRouter.route('/foods/:foodId/edit', {
    action: function(params) {
    },
    name: "editFood"
});

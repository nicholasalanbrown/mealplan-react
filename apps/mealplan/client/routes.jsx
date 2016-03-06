import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/accounts/SignIn';
import RecipeList from './components/recipes/RecipeList';
import IngredientList from './components/ingredients/IngredientList';
import RecipeContent from './components/recipes/RecipeContent';


let public = FlowRouter.group {};
let admin = FlowRouter.group {
  triggersEnter: [ ->
    unless Meteor.loggingIn() or Meteor.userId()
      route = FlowRouter.current()
      unless route.route.name is 'login'
        Session.set 'redirectAfterLogin', route.path
      FlowRouter.go ‘login’
  ]
};


//Global routes

public.route("/", {
  action: function() {
    ReactLayout.render(App, {
      content: <Home />
    });
  },
  name: 'home'
});


//Accounts

public.route("/login", {
  action: function() {
    ReactLayout.render(App, {
      content: <SignIn />
    });
  },
  name: 'login'
});


//Recipe routes

admin.route("/recipes", {
  action: function() {
    ReactLayout.render(App, {
      content: <RecipeList />
    });
  },
  name: "listRecipes"
});

admin.route('/add/recipe', {
    action: function(params) {
    }
})

admin.route('/recipes/:recipeId', {
  action: function(params) {
    console.log(params);
    ReactLayout.render(App, {
      content: <RecipeContent recipeId={params.recipeId}/>
    });
  },
    name: "viewRecipe"
});

admin.route('/recipes/:recipeId/edit', {
    action: function(params) {
    },
    name: "editRecipe"
});


//Ingredient routes

admin.route("/ingredients", {
  action: function() {
    ReactLayout.render(App, {
      content: <IngredientList />
    });
  },
  name: "listIngredients"
});

admin.route('/add/ingredient', {

})

admin.route('/ingredients/:ingredientId/edit', {

});


//Food routes

admin.route('/add/food', {
    action: function(params) {
    }
})

admin.route('/foods/:foodId/edit', {
    action: function(params) {
    },
    name: "editFood"
});

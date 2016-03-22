import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/accounts/SignIn';

import RecipeList from './components/recipes/RecipeList';
import AddRecipe from './components/recipes/AddRecipe';
import EditRecipe from './components/recipes/EditRecipe';
import RecipeContent from './components/recipes/RecipeContent';

import AddIngredient from './components/ingredients/AddIngredient';
import IngredientList from './components/ingredients/IngredientList';




const scrollToTop = function (context) {
  $('#react-root').scrollTop(0,0);
}

const publicRoutes = FlowRouter.group(
  {
    name: 'public',
    triggersEnter: [scrollToTop]
  }
);
const adminRoutes = FlowRouter.group(
  {
    name: 'admin',
    triggersEnter: [scrollToTop]
  }
);


//Global routes

publicRoutes.route('/', {
  action: function() {
    ReactLayout.render(App, {
      content: <Home />
    });
  },
  name: 'home'
});


//Accounts

publicRoutes.route('/login', {
  action: function() {
    ReactLayout.render(App, {
      content: <SignIn />
    });
  },
  name: 'login'
});


//Recipe routes

adminRoutes.route('/recipes', {
  action: function() {
    ReactLayout.render(App, {
      content: <RecipeList />
    });
  },
  name: 'listRecipes'
});

adminRoutes.route('/add/recipe', {
  action: function() {
    ReactLayout.render(App, {
      content: <AddRecipe />
    });
  },
  name: 'addRecipe'
})

adminRoutes.route('/recipes/:recipeId', {
  action: function(params) {
    ReactLayout.render(App, {
      content: <RecipeContent recipeId={params.recipeId}/>
    });
  },
    name: 'viewRecipe'
});

adminRoutes.route('/recipes/:recipeId/edit', {
    action: function(params) {
      ReactLayout.render(App, {
      content: <EditRecipe recipeId={params.recipeId}/>
      });
    },
    name: 'editRecipe'
});


//Ingredient routes

adminRoutes.route('/ingredients', {
  action: function() {
    ReactLayout.render(App, {
      content: <IngredientList />
    });
  },
  name: 'listIngredients'
});

adminRoutes.route('/add/ingredient', {
  action: function() {
    ReactLayout.render(App, {
      content: <AddIngredient />
    });
  },
  name: 'addIngredient'
})

adminRoutes.route('/ingredients/:ingredientId/edit', {

});


//Food routes

adminRoutes.route('/add/food', {
    action: function(params) {
    }
})

adminRoutes.route('/foods/:foodId/edit', {
    action: function(params) {
    },
    name: 'editFood'
});

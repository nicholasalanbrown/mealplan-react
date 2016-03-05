import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactLayout } from 'meteor/kadira:react-layout';
import App from './components/App';
import Home from './components/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeContent from './components/recipes/RecipeContent';

FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(App, {
      content: <Home />
    });
  }
});

FlowRouter.route("/other", {
  action: function() {
    ReactLayout.render(App, {
      content: <Other />
    });
  }
});




FlowRouter.route('/', {
    action: function(params) {
    }
})

FlowRouter.route('/shopping', {
    action: function(params) {
    },
    name: "viewShoppingList"
});

FlowRouter.route("/recipes", {
  action: function() {
    ReactLayout.render(App, {
      content: <RecipeList />
    });
  },
  name: "listRecipes"
});

FlowRouter.route('/recipes/:recipeId', {
  action: function(params) {
    console.log(params);
    ReactLayout.render(App, {
      content: <RecipeContent recipeId={params.recipeId}/>
    });
  },
    name: "viewRecipe"
});

FlowRouter.route('/recipes/:recipeId', {
    action: function(params) {
    },
    name: "viewRecipe"
});

FlowRouter.route('/recipes/:recipeId/edit', {
    action: function(params) {
    },
    name: "editRecipe"
});

FlowRouter.route('/add/ingredient', {

})

FlowRouter.route('/ingredients/:ingredientId/edit', {

});

FlowRouter.route('/add/food', {
    action: function(params) {
    }
})

FlowRouter.route('/foods/:foodId/edit', {
    action: function(params) {
    },
    name: "editFood"
});

FlowRouter.route('/add/recipe', {
    action: function(params) {
    }
})

FlowRouter.route('/add/cuisine', {
    action: function(params) {
    }
})

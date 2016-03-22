import { Meteor } from 'meteor/meteor';
import Recipes from 'mealplan/collections/Recipes';

Meteor.methods({
  addRecipe: function (title, cuisine, servings, type, ingredients, instructions) {
    check(title, String);
    check(cuisine, String);
    check(servings, Number);
    check(ingredients, Match.Any);
    check(instructions, Match.Any);
    Recipes.insert({
      title: title,
      cuisine: cuisine,
      servings: servings,
      type: type,
      ingredients: ingredients,
      instructions: instructions
    });
  },
  updateRecipe: function (recipeId, title, cuisine, servings, type, ingredients, instructions) {
    check(recipeId, String);
    check(title, String);
    check(cuisine, String);
    check(servings, Number);
    check(ingredients, Match.Any);
    check(instructions, Match.Any);
    Recipes.update({
      _id: recipeId
    },
    {$set: {
        title: title,
        cuisine: cuisine,
        servings: servings,
        type: type,
        ingredients: ingredients,
        instructions: instructions
      }
    });
  },
  calculateServings: function () {
    var user = Meteor.user();
    var householdMembers = user.profile.householdMembers;
    var dinners = user.profile.defaultMeals.dinners;
    return householdMembers*dinners;
  },
  deleteRecipe: function (recipeId) {
    check(recipeId, String);
    Recipes.remove({_id: recipeId});
  }
});

import { Meteor } from 'meteor/meteor';
import Recipes from 'mealplan/collections/Recipes';

Meteor.methods({
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

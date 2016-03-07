import { Meteor } from 'meteor/meteor';

import Recipes from 'mealplan/collections/Recipes';
import Foods from 'mealplan/collections/Foods';
import Ingredients from 'mealplan/collections/Ingredients';
import Cuisines from 'mealplan/collections/Cuisines';
import Plans from 'mealplan/collections/Plans';
import Nutrition from 'mealplan/collections/Nutrition';

Meteor.publish("singleRecipe", function (recipeId) {
  check(recipeId, String);
  return [
    Recipes.find({_id: recipeId})
  ];
});

Meteor.publish("singleFood", function (foodId) {
  check(foodId, String);
  return [
    Foods.find({_id: foodId})
  ];
});

Meteor.publish("singleIngredient", function (ingredientId) {
  check(ingredientId, String);
  return [
    Ingredients.find({_id: ingredientId})
  ];
});

Meteor.publish("allFoods", function () {
  return [
    Foods.find()
  ];
});

Meteor.publish("allIngredients", function () {
  return [
    Ingredients.find()
  ];
});

Meteor.publish("allNutrition", function () {
  return [
    Nutrition.find({"name.long": {$text: {$search: 'butter'}}})
  ];
});

Meteor.publish("allCuisines", function () {
  return [
    Cuisines.find()
  ];
});

Meteor.publish("allRecipes", function () {
  return [
    Recipes.find()
  ];
});

Meteor.publish("getCurrentWeekMealPlan", function () {
  if (this.userId) {
    var user = this.userId;
    var week = moment().weeks();
    var year = moment().weekYear();
    var mealPlan = Plans.findOne({user: user, week: week, year: year});
    if (mealPlan) {
      var recipeIds = [];
      _.each(mealPlan.meals, function(meal) {
        recipeIds.push(_.values(meal));
      })
      var uniqueIds = _.uniq(_.flatten(recipeIds));
      return Recipes.find({_id: {$in: uniqueIds}});
    }
    else {
      return;
    }
  }
});

Meteor.publish("ingredients", function (ingredientIds) {
  return [
    Ingredients.find({_id: {$in: ingredientIds}})
  ];
});

Nutrition._ensureIndex({
  "name.long": "text"
});

Meteor.publish("search", function(searchValue) {
  if (!searchValue) {
    return;
  }
  return Nutrition.find(
    { $text: {$search: searchValue} },
    {
      // `fields` is where we can add MongoDB projections. Here we're causing
      // each document published to include a property named `score`, which
      // contains the document's search rank, a numerical value, with more
      // relevant documents having a higher score.
      fields: {
        score: { $meta: "textScore" }
      },
      // This indicates that we wish the publication to be sorted by the
      // `score` property specified in the projection fields above.
      sort: {
        score: { $meta: "textScore" }
      }, limit: 300
    }
  );
});

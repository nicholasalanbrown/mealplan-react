import { Meteor } from 'meteor/meteor';

import Recipes from 'mealplan/collections/Recipes';
import Foods from 'mealplan/collections/Foods';
import Ingredients from 'mealplan/collections/Ingredients';
import Cuisines from 'mealplan/collections/Cuisines';
import Plans from 'mealplan/collections/Plans';
import Nutrition from 'mealplan/collections/Nutrition';

Meteor.publish('userData', function () {
  let user = this.userId;
  return Meteor.users.find({_id: user}, {fields: {'services.facebook.first_name': 1}});
});


Meteor.publish('singleRecipe', function (recipeId) {
  check(recipeId, String);
  return [
    Recipes.find({_id: recipeId})
  ];
});

Meteor.publish('getPlanRecipes', function (meals) {
  var user = this.userId;
  var week = moment().weeks();
  var year = moment().weekYear();
  let recipeIds = [];
  _.each(meals, function(meal) {
    recipeIds.push(_.values(meal));
  })
  var uniqueIds = _.uniq(_.flatten(recipeIds));
  return [
    Recipes.find({_id: {$in: uniqueIds}})
  ];
});

Meteor.publish('multipleRecipes', function (recipeIds) {
  check(recipeIds, Match.Any);
  return [
    Recipes.find({_id: {$in: recipeIds}})
  ];
});

Meteor.publish('singleFood', function (foodId) {
  check(foodId, String);
  return [
    Foods.find({_id: foodId})
  ];
});

Meteor.publish('singleIngredient', function (ingredientId) {
  check(ingredientId, String);
  return [
    Ingredients.find({_id: ingredientId})
  ];
});

Meteor.publish('allFoods', function () {
  return [
    Foods.find()
  ];
});

Meteor.publish('allIngredients', function () {
  return [
    Ingredients.find()
  ];
});

Meteor.publish('allNutrition', function () {
  return [
    Nutrition.find({'name.long': {$text: {$search: 'butter'}}})
  ];
});

Meteor.publish('allCuisines', function () {
  return [
    Cuisines.find()
  ];
});

Meteor.publish('allRecipes', function () {
  return [
    Recipes.find()
  ];
});

Meteor.publish('getWeekPlan', function () {
    let user = this.userId;
    let week = moment().weeks();
    let year = moment().weekYear();
    let recipeIds = [];
    let plan = Plans.find({user: user, week: week, year: year});
    plan.map(function (p) {
      p.meals.forEach(function (m) {
        if(m.full) {
          recipeIds.push(m.full);
        }
        if (m.main) {
          recipeIds.push(m.main);
        }
        if (m.side) {
          recipeIds.push(m.side);
        }
      })
    });

    /*
    _.each(meals, function(meal) {
      recipeIds.push(_.values(meal));
    })
    var uniqueIds = _.uniq(_.flatten(recipeIds));
    return [
      Recipes.find({_id: {$in: uniqueIds}})
    ];
    */
    return [plan, Recipes.find({_id: {$in: recipeIds}})];
});


Meteor.publish('weeksRecipes', function (meals) {
    var recipeIds = [];
    _.each(meals, function(meal) {
      recipeIds.push(_.values(meal));
    })
    var uniqueIds = _.uniq(_.flatten(recipeIds));
    return Recipes.find({_id: {$in: uniqueIds}});
  }
);

Meteor.publish('getCurrentWeekMealPlan', function () {
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

Meteor.publish('ingredients', function (ingredientIds) {
  return [
    Ingredients.find({_id: {$in: ingredientIds}})
  ];
});

Nutrition._ensureIndex({
  'name.long': 'text'
});

Meteor.publish('search', function(searchValue) {
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
        score: { $meta: 'textScore' }
      },
      // This indicates that we wish the publication to be sorted by the
      // `score` property specified in the projection fields above.
      sort: {
        score: { $meta: 'textScore' }
      }, limit: 300
    }
  );
});

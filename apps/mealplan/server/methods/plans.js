import { Meteor } from 'meteor/meteor';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';

Meteor.methods({
  buildWeeklyPlan: function (userId, meals, people) {
    check(userId, String);
    check(meals, Number);
    check(people, Number);

    var user = Meteor.users.findOne({_id: userId});
    var servings = meals*people;
    var recipeIds = [];
    var weeksRecipes = []
    var mainsCount = 0;
    var sidesCount = 0;
    var fullRecipes = [];
    var mainRecipes = [];
    var sideRecipes = [];
    while (mainsCount<servings) {
      var mainsDiff = servings-mainsCount;
      var recipes = Recipes.find({_id: {$nin: recipeIds}, type: {$in: ["main", "full"]}, servings: {$lte: mainsDiff}}).fetch();
      var random = _.sample(recipes);
      var newMainsCount = mainsCount + random.servings;
      mainsCount = newMainsCount;
      if (random.type === "full") {
        var newSidesCount = sidesCount + random.servings;
        sidesCount = newSidesCount;
        fullRecipes.push({_id: random._id, servings: random.servings});
      }
      else {
        mainRecipes.push({_id: random._id, servings: random.servings});
      }
      recipeIds.push(random._id);
    }
    while (sidesCount<servings) {
      var sidesDiff = servings-sidesCount;
      var recipes = Recipes.find({_id: {$nin: recipeIds}, type: "side", servings: {$lte: sidesDiff}}).fetch();
      var random = _.sample(recipes);
      var newSidesCount = sidesCount + random.servings;
      sidesCount = newSidesCount;
      sideRecipes.push({_id: random._id, servings: random.servings});
      recipeIds.push(random._id);
    }
    _.each(fullRecipes, function(full) {
      var servingsTally = full.servings;
      while (servingsTally > 0) {
        weeksRecipes.push({full: full._id});
        var newServingsTally = servingsTally - people;
        servingsTally = newServingsTally;
      }
    })
    _.each(mainRecipes, function(main) {
      var servingsTally = main.servings;
      while (servingsTally > 0) {
        weeksRecipes.push({main: main._id});
        var newServingsTally = servingsTally - people;
        servingsTally = newServingsTally;
      }
    })
    _.each(sideRecipes, function(side) {
      var servingsTally = side.servings;
      while (servingsTally > 0) {
        var recipe = _.find(weeksRecipes, function (recipe) { return recipe.main && !recipe.side});
        recipe.side = side._id;
        _.extend(_.findWhere(weeksRecipes, { main: recipe.main }), recipe);
        var newServingsTally = servingsTally - people;
        servingsTally = newServingsTally;
      }
    })
    Meteor.call('addPlan', user, weeksRecipes);
  },
  addPlan: function (user, weeksRecipes) {
    var week = moment().week();
    var year = moment().weekYear();
    var doc =
    {
        user: user._id,
        week: week,
        year: year,
        meals: weeksRecipes
    };
    Plans.update({user: user, week: week, year: year}, {$set: doc}, {upsert: true});
  },
  generateMealPlans: function () {
    Meteor.users.find().map(function(user) {
      Meteor.call('buildWeeklyPlan',user._id, user.profile.defaultMeals.dinners, user.profile.householdMembers);
    });
  }
});

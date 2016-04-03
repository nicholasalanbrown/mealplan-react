import { Meteor } from 'meteor/meteor';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';
import moment from 'moment';

const findPreviousPlanRecipes = function (userId) {
  let recipeIds = [];
  let now = moment();
  let before = moment().subtract(7, 'days');
  let beforeWeek = before.week();
  let beforeYear = before.weekYear();
  let beforePlan = Plans.findOne({user: userId, week: beforeWeek, year: beforeYear});
  if (beforePlan) {
    let tempIds = [];
    _.each(beforePlan.meals, function(meal) {
      tempIds.push(_.values(meal));
    })
    var uniqueIds = _.uniq(_.flatten(tempIds));
    recipeIds = uniqueIds;
  }
  return recipeIds;
}

Meteor.methods({
  buildWeeklyPlan: function (userId, meals, people) {
    check(userId, String);
    check(meals, Number);
    check(people, Number);

    const week = moment().week();
    const year = moment().weekYear();

    var existingPlan = Plans.findOne({user: userId, week: week, year: year});
    if (!existingPlan) {
      console.log('Creating a new plan..');
      var user = Meteor.users.findOne({_id: userId});
      let previousRecipes = findPreviousPlanRecipes(user._id, moment().week(), moment().weekYear());
      var servings = meals*people;
      var recipeIds = previousRecipes;
      var weeksRecipes = []
      var mainsCount = 0;
      var sidesCount = 0;
      var fullRecipes = [];
      var mainRecipes = [];
      var sideRecipes = [];
      while (mainsCount<servings) {
        var mainsDiff = servings-mainsCount;
        console.log('Looking for a main or f3ull dish...');
        var recipes = Recipes.find({_id: {$nin: recipeIds}, type: {$in: ['main', 'full']}, servings: {$lte: mainsDiff}}).fetch();
        var random = _.sample(recipes);
        console.log('Main or full dish:' + random.title);
        var newMainsCount = mainsCount + random.servings;
        mainsCount = newMainsCount;
        if (random.type === 'full') {
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
        console.log('Looking for a side dish...');
        var sidesDiff = servings-sidesCount;
        var recipes = Recipes.find({_id: {$nin: recipeIds}, type: 'side', servings: {$lte: sidesDiff}}).fetch();
        var random = _.sample(recipes);
        console.log(`Side dish: ${random.title}`);
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
          var index = weeksRecipes.findIndex(recipe => recipe.main && !recipe.side);
          recipe.side = side._id;
          weeksRecipes[index] = recipe;
          var newServingsTally = servingsTally - people;
          servingsTally = newServingsTally;
        }
      })
      Meteor.call('addPlan', user, weeksRecipes);
      const shoppingList = Meteor.call('buildShoppingList', recipeIds);
      Meteor.call('addShoppingListToPlan', user._id, shoppingList);
    }
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
  removePlan: function () {
    var user = this.userId;
    var week = moment().week();
    var year = moment().weekYear();
    Plans.remove({user: user, week: week, year: year});
  },
  generateMyPlan: function () {
    let user = Meteor.user();
    Meteor.call('buildWeeklyPlan',user._id, user.profile.defaultMeals.dinners, user.profile.householdMembers,
      function (error, result) {
        if(error) {
          console.log(error);
        }
        else {
          return;
        }
      }
  );
  },
  generateMealPlans: function () {
    console.log('Generating weekly meal plans...');
    Meteor.users.find().map(function(user) {
      Meteor.call('buildWeeklyPlan',user._id, user.profile.defaultMeals.dinners, user.profile.householdMembers);
    });
  }
});

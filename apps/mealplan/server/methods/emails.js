import { Meteor } from 'meteor/meteor';

Meteor.methods({
  generateEmail: function (weeksRecipes, recipient) {
    var recipeIds = [];
    _.each(weeksRecipes, function (recipe) {
      if (recipe.full) {
        recipeIds.push(recipe.full);
      }
      if (recipe.main) {
        recipeIds.push(recipe.main);
      }
      if (recipe.side) {
        recipeIds.push(recipe.side);
      }
    })
    var ingredientList = Meteor.call('buildShoppingList', recipeIds);
    var recipeData = Recipes.find({_id: {$in: recipeIds}}).fetch();
    var shoppingContent = formatShoppingList(ingredientList);
    var recipeContent = formatRecipes(weeksRecipes, recipeData);
    Email.send({
      to: recipient,
      from: "info@mealplan.com",
      subject: new Date(),
      html: shoppingContent+"<p>"+recipeContent+"</p>"
    });
  },
  sendWeeklyEmail: function (recipientId, recipientEmail, week, year) {
    check(recipientId, String);
    check(recipientEmail, String);
    check(week, Number);
    check(year, Number);
    console.log('Preparing weekly email...');
    var mealPlan = Plans.findOne({user: recipientId, week: week, year: year});
    var weeksRecipes = mealPlan.meals;
    var recipeIds = [];
    _.each(weeksRecipes, function (recipe) {
      if (recipe.full) {
        recipeIds.push(recipe.full);
      }
      if (recipe.main) {
        recipeIds.push(recipe.main);
      }
      if (recipe.side) {
        recipeIds.push(recipe.side);
      }
    })
    var ingredientList = Meteor.call('buildShoppingList', recipeIds);
    console.log('Building ingrdient list...');
    var recipeData = Recipes.find({_id: {$in: recipeIds}}).fetch();
    console.log('Building recipe list...');
    var shoppingContent = formatShoppingList(ingredientList);
    var recipeContent = formatRecipes(weeksRecipes, recipeData);
    console.log('Sending email to '+recipientEmail+'...');
    Email.send({
      to: recipientEmail,
      from: "info@mealplan.com",
      subject: "Here's your meal plan for the week!",
      html: shoppingContent+"<p>"+recipeContent+"</p>"
    });
  },
  distributeWeeklyEmails: function () {
    Meteor.users.find().map(function(user) {
      var week = moment().weeks();
      var year = moment().weekYear();
      var mealPlan = Plans.findOne({user: user._id, week: week, year: year});
      Meteor.call('sendWeeklyEmail', user._id, user.services.facebook.email, week, year);
    });
  }
});

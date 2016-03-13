import { Meteor } from 'meteor/meteor';
import Plans from 'mealplan/collections/Plans';
import Recipes from 'mealplan/collections/Recipes';


const formatShoppingList = function (list) {
  var stringList = '<p><strong>This week"s shopping list:</strong></p><ul>';
  _.each(list, function (item) {
    if(item.measurement){
      var measurement = item.measurement+' ';
    } else {
      var measurement = '';
    }
    var quantity = '';
    if (item.quantity) {
      quantity = item.quantity +' ';
    }
    var newList = stringList.concat(
      '<li>'+
      quantity+
      measurement+
      item.listName+
      '</li>'
    );
    stringList = newList;
  });
  return stringList+'</ul>';
}

const formatRecipes = function (weeksRecipes, recipeData) {
  var stringList = '';
  var mealList = '<p><strong>This weeks dinners:</strong></p>';
  _.each(weeksRecipes, function (meal) {
    if (meal.full) {
      var doc = _.findWhere(recipeData, {_id: meal.full});
      var newMealList = mealList.concat('<p>'+doc.title+'</p>');
      mealList = newMealList;
    }
    else {
      var mainDoc = _.findWhere(recipeData, {_id: meal.main});
      var sideDoc = _.findWhere(recipeData, {_id: meal.side});
      var newMealList = mealList.concat('<p>'+mainDoc.title+'<br>'+sideDoc.title+'</p>');
      mealList = newMealList;
    }
  });
  _.each(recipeData, function (recipe) {
    var ingredientList = '';
    _.each(recipe.ingredients, function (ingredient) {
      if(ingredient.measurement){
        var measurement = ingredient.measurement+' ';
      } else {
        var measurement = '';
      }
      var newIngredientList = ingredientList.concat(
        '<li>'+
        ingredient.quantity+' '+
        measurement+
        ingredient.listName+
        '</li>'
      );
      ingredientList = newIngredientList;
    });
    var instructionList = '';
    _.each(recipe.instructions, function (instruction) {
      var newInstructionList = instructionList.concat(
        '<p>'+instruction+'</p>'
      )
      instructionList = newInstructionList;
    })
    var newList = stringList.concat(
      '<p><strong>'+recipe.title+'</strong></p>'+
      '<ul>'+ingredientList+'</ul>'+
      instructionList+
      '<br>'
    );
    stringList = newList;
  })
  var recipeTitles = '<p><strong>This weeks dinners:</p></strong>';
  _.each(recipeData, function(recipe) {
    var newRecipeTitles = recipeTitles.concat(recipe.title+'<br>');
    recipeTitles = newRecipeTitles;
  });
  return mealList+'<br><br>'+stringList;
}


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
      from: 'info@mealplan.com',
      subject: new Date(),
      html: shoppingContent+'<p>'+recipeContent+'</p>'
    });
  },
  sendWeeklyEmail: function (recipientId, recipientEmail, week, year) {
    check(recipientId, String);
    check(recipientEmail, String);
    check(week, Number);
    check(year, Number);
    console.log('Preparing weekly email...');
    var mealPlan = Plans.findOne({user: recipientId, week: week, year: year});
    if (mealPlan) {
      console.log('Plan found, sending email...')
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
      from: 'info@mealplan.com',
      subject: 'Here"s your meal plan for the week!'+ new Date(),
      html: shoppingContent+'<p>'+recipeContent+'</p>'
    });
  }
  else {
    console.log('No plan found. Not sending email to '+ recipientEmail);
  }
  },
  distributeWeeklyEmails: function () {
    console.log('Distributing weekly meal plans to users...');
    Meteor.users.find().map(function(user) {
      var week = moment().weeks();
      var year = moment().weekYear();
      var mealPlan = Plans.findOne({user: user._id, week: week, year: year});
      Meteor.call('sendWeeklyEmail', user._id, user.services.facebook.email, week, year);
    });
  }
});

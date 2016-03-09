import { Meteor } from 'meteor/meteor';
import Ingredients from 'mealplan/collections/Ingredients';
import Nutrition from 'mealplan/collections/Nutrition';

Meteor.methods({
  addIngredient: function (listName, databaseName) {
    check(listName, String);
    if (databaseName) {
      let databaseIngredient = Nutrition.findOne({'name.long': databaseName});
      databaseIngredient.listName = listName;
      delete databaseIngredient._id;
      Ingredients.insert(databaseIngredient);
    }
    else {
      Ingredients.insert({listName: listName});
    }
  },
  updateIngredient: function (ingredientId, type, value) {
    check(ingredientId, String);
    check(type, String);
    check(value, String);
    if (type === 'name') {
      Ingredients.update({_id: ingredientId}, {$set: {listName: value}});
    }
    else {
      Ingredients.update({_id: ingredientId}, {$set: {pluralName: value}});
    }
  },
  updateIngredientNames: function () {
    var ingredients = Ingredients.find().fetch();
    _.each(ingredients, function (item) {
      Recipes.update({'ingredients._id': item._id},{$set: {'ingredients.$.name': item.name}},{multi:true});
      if(item.pluralName) {
        Recipes.update({'ingredients._id': item._id},{$set: {'ingredients.$.pluralName': item.pluralName}},{multi:true});
      }
    })
  },
  deleteIngredient: function (ingredientId) {
    check(ingredientId, String);
    Ingredients.remove({_id: ingredientId});
  }
});

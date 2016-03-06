import { Meteor } from 'meteor/meteor';
import Ingredients from 'mealplan/collections/Ingredients';

Meteor.methods({
  addIngredient: function (name) {
    check(name, String);
    Ingredients.insert({name: name});
  },
  updateIngredientNames: function () {
    var ingredients = Ingredients.find().fetch();
    _.each(ingredients, function (item) {
      Recipes.update({"ingredients._id": item._id},{$set: {"ingredients.$.name": item.name}},{multi:true});
      if(item.pluralName) {
        Recipes.update({"ingredients._id": item._id},{$set: {"ingredients.$.pluralName": item.pluralName}},{multi:true});
      }
    })
  },
  deleteIngredient: function (ingredientId) {
    check(ingredientId, String);
    Ingredients.remove({_id: ingredientId});
  }
});

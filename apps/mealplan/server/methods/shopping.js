import { Meteor } from 'meteor/meteor';
import Recipes from 'mealplan/collections/Recipes';

Meteor.methods({
  buildShoppingList: function (recipeIds) {
    var shoppingList = [];
    var recipes = Recipes.find({_id: {$in: recipeIds}}).fetch();
    _.each(recipes, function (item) {
      var ingredients = item.ingredients;
      _.each(ingredients, function (subItem) {
        var listItem;
        if(!subItem.quantity) {
          listItem = {_id: subItem._id, listName: subItem.listName, suffix: subItem.suffix};
        }
        else {
          listItem = {_id: subItem._id, quantity: subItem.quantity, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        var existingItem = _.findWhere(shoppingList, {_id: subItem._id});
        if(existingItem) {
          var newItem = existingItem;
          if (existingItem.measurement === listItem.measurement) {
            newItem.quantity = existingItem.quantity + listItem.quantity;
          }
          else {
            if (listItem.quantity) {
            newItem.addQuantity = listItem.quantity;
            newItem.addMeasurement = listItem.measurement;
            }
          }
          _.extend(_.findWhere(shoppingList, { _id: subItem._id }), newItem);
          return;
        }
        else {
          shoppingList.push(listItem);
        }
      });
    });
    return shoppingList;
  }
});

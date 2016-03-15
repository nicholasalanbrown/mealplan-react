import { Meteor } from 'meteor/meteor';
import math from 'mathjs';

import Recipes from 'mealplan/collections/Recipes';
import Plans from 'mealplan/collections/Plans';

Meteor.methods({
  buildShoppingList: function (recipeIds) {
    var shoppingList = [];
    var recipes = Recipes.find({_id: {$in: recipeIds}}).fetch();
    _.each(recipes, function (item) {
      var ingredients = item.ingredients;
      _.each(ingredients, function (subItem) {
        var listItem;
        if(!subItem.quantity && !subItem.fraction) {
          listItem = {_id: subItem._id, listName: subItem.listName, suffix: subItem.suffix};
        }
        else if (subItem.fraction){
          let quantity = math.fraction(subItem.quantity);
          let fraction = math.fraction(subItem.fraction);
          console.log('quantity', quantity)
          console.log('fraction', fraction);
          let sum = math.add(quantity, fraction);
          listItem = {_id: subItem._id, quantity: subItem.sum, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        else {
          let quantity = math.fraction(subItem.quantity);
          listItem = {_id: subItem._id, quantity: quantity, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        var existingItem = _.findWhere(shoppingList, {_id: subItem._id});
        if(existingItem) {
          var newItem = existingItem;
          if (existingItem.measurement === listItem.measurement) {
            let sum = math.add(existingItem.quantity, listItem.quantity);
            newItem.quantity = sum;
          }
          else {
            if (listItem.quantity) {
            newItem.addQuantity = math.fraction(listItem.quantity);
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
    _.each(shoppingList, function(item, index) {
      if (item.quantity) {
        item.quantity = item.quantity.toString();
        shoppingList[index] = item;
      }
      if (item.addQuantity) {
        item.addQuantity = item.addQuantity.toString();
        shoppingList[index] = item;
      }
    })
    return shoppingList;
  },
  addShoppingListToPlan: function (user, shoppingList) {
    check(user, String);
    check(shoppingList, Array);
    var week = moment().week();
    var year = moment().weekYear();
    Plans.update({user: user, week: week, year: year}, {$set: {shoppingList: shoppingList}});
  }
});

import { Meteor } from 'meteor/meteor';
import math from 'mathjs';

import Recipes from 'mealplan/collections/Recipes';
import Plans from 'mealplan/collections/Plans';

const decimalToFractionString = function (number) {
  let fractionString;
  let wholeNumber = Math.floor(Number(number));
  let fraction = math.fraction(number-wholeNumber);
  if (fraction.n > 0 && wholeNumber > 0) {
    fractionString = wholeNumber + ' ' + fraction.n + '/' + fraction.d;
  }
  else if (fraction.n > 0) {
    fractionString = fraction.n + '/' + fraction.d;
  }
  else {
    fractionString = wholeNumber.toString();
  }
  return fractionString;
}


Meteor.methods({
  buildShoppingList: function (recipeIds) {
    console.log('Building shopping list...');
    var shoppingList = [];
    var recipes = Recipes.find({_id: {$in: recipeIds}}).fetch();
    _.each(recipes, function (item) {
      var ingredients = item.ingredients;
      _.each(ingredients, function (subItem) {
        var listItem;
        if(!subItem.quantity && !subItem.fraction) {
          listItem = {_id: subItem._id, listName: subItem.listName, suffix: subItem.suffix};
        }
        else if (subItem.quantity && subItem.fraction){
          let quantity = math.fraction(subItem.quantity);
          let fraction = math.fraction(subItem.fraction);
          let sum = math.add(quantity, fraction);
          listItem = {_id: subItem._id, quantity: sum, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        else if (!subItem.quantity && subItem.fraction){
          let fraction = math.fraction(subItem.fraction);
          let sum = math.add(0, fraction);
          listItem = {_id: subItem._id, quantity: sum, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        else {
          let quantity = math.fraction(subItem.quantity);
          listItem = {_id: subItem._id, quantity: quantity, measurement: subItem.measurement, listName: subItem.listName, suffix: subItem.suffix};
        }
        var existingItem = _.findWhere(shoppingList, {_id: subItem._id});
        if(existingItem) {
          console.log(existingItem);
          console.log(listItem);
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
        let number = Number(item.quantity.toString());
        item.quantity = decimalToFractionString(number);
        shoppingList[index] = item;
      }
      if (item.addQuantity) {
        let number = Number(item.addQuantity.toString());
        item.addQuantity = decimalToFractionString(number);
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

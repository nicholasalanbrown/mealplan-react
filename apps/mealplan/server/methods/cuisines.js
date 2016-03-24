import { Meteor } from 'meteor/meteor';
import Cuisines from 'mealplan/collections/Cuisines';

Meteor.methods({
  addCuisine: function (name) {
    check(name, String);
    Cuisines.insert({name: name});
  },
  deleteCuisine: function (cuisineId) {
    check(cuisineId, String);
    Cuisines.remove({_id: cuisineId});
  }
});

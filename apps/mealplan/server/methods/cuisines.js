import { Meteor } from 'meteor/meteor';
import Cuisines from 'mealplan/collections/Cuisines';

Meteor.methods({
  deleteCuisine: function (cuisineId) {
    check(cuisineId, String);
    Cuisines.remove({_id: cuisineId});
  }
});

import { Meteor } from 'meteor/meteor';
import Foods from 'mealplan/collections/Foods';

Meteor.methods({
  deleteFood: function (foodId) {
    check(foodId, String);
    Foods.remove({_id: foodId});
  },
});

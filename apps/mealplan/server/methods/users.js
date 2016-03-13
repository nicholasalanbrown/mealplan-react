import { Meteor } from 'meteor/meteor';

Meteor.methods({
  togglePlanSubscription: function () {
   let user = Meteor.user();
   Meteor.users.update({_id: user._id}, {$set: {'profile.receivingPlans': !user.profile.receivingPlans}});
  },
});

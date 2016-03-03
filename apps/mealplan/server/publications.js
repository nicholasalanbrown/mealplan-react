import { Meteor } from 'meteor/meteor';
import Tasks from 'mealplan/collections/Tasks';

// This code only runs on the server
Meteor.publish('tasks', function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

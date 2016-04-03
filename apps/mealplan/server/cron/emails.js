SyncedCron.add({
  name: 'Create weekly meal plans and distribute to users via email',
  schedule: function(parser) {
    return parser.text('at 9:00 am on Sunday');
  },
  job: function() {
    Meteor.call('generateMealPlans');
    Meteor.call('distributeWeeklyEmails');
  }
});

SyncedCron.start();

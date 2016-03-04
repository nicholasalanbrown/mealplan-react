SyncedCron.add({
  name: 'Create weekly meal plans and distribute to users via email',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 10:00 am on Sunday');
  },
  job: function() {
    Meteor.call('generateMealPlans');
    Meteor.call('distributeWeeklyEmails');
  }
});

SyncedCron.start();

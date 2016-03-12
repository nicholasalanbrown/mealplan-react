Accounts.onCreateUser(function(options, user) {
  if (options.profile)
    user.profile = options.profile;
    let defaultMeals = {
      dinners: 3
    };
    let householdMembers = 2;
    user.profile.defaultMeals = defaultMeals;
    user.profile.householdMembers = householdMembers;
  return user;
});

// Set up login services

Meteor.startup(function() {

process.env.MAIL_URL = 'smtp://postmaster@sandbox36c2dac549f24df598b266dff2081419.mailgun.org:8cb5c8659661da0378e80b9bbab6d646@smtp.mailgun.org:587'

/*
  // Local Facebook configuration
  ServiceConfiguration.configurations.remove({});
  ServiceConfiguration.configurations.update(
    { service: 'facebook' },
    { $set: {
        appId: '929082943873718',
        secret: 'd26dfaca06927ac96a84a2b3165d8a78'
      }
    },
    { upsert: true }
  );

// Production Facebook configuration
ServiceConfiguration.configurations.remove({});
ServiceConfiguration.configurations.update(
  { service: 'facebook' },
  { $set: {
      appId: '1695420100675383',
      secret: '653067efedb62b24abe2d2d0450b685c'
    }
  },
  { upsert: true }
);
*/
});

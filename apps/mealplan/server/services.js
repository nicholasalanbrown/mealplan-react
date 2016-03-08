// Set up login services
Meteor.startup(function() {

Meteor.users.find({"service.facebook.id": "10101823222893582"}).map(function(user) {
  Roles.addUsersToRoles(user._id, 'admins', Roles.GLOBAL_GROUP);
});

/*
  // Local Facebook configuration
  ServiceConfiguration.configurations.remove({});
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "929082943873718",
        secret: "d26dfaca06927ac96a84a2b3165d8a78"
      }
    },
    { upsert: true }
  );

// Production Facebook configuration
ServiceConfiguration.configurations.remove({});
ServiceConfiguration.configurations.update(
  { service: "facebook" },
  { $set: {
      appId: "1695420100675383",
      secret: "653067efedb62b24abe2d2d0450b685c"
    }
  },
  { upsert: true }
);
*/
});

// This file is sent directly to Meteor without going through Webpack
// You can initialize anything you need before your app start here

Meteor.users.find({'services.facebook.id': '10101823222893582'}).map(function(user) {
  console.log('Making '+user._id+'an admin...');
  Roles.addUsersToRoles(user._id, 'admins', Roles.GLOBAL_GROUP);
});

FlowRouter.wait();

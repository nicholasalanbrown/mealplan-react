var Schema = {};

Schema.DefaultMeals = new SimpleSchema({
  dinners: {
    type: Number,
    defaultValue: 3,
    allowedValues: [0,1,2,3,4,5,6,7],
  }
});

Schema.UserProfile = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    defaultMeals: {
      type: Schema.DefaultMeals
    },
    householdMembers: {
      type: Number,
      defaultValue: 2,
      allowedValues: [1,2,3,4,5,6],
    },
    receivingPlans: {
      type: Boolean,
      defaultValue: true
    }
});

Schema.User = new SimpleSchema({
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);

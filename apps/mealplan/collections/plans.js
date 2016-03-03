import { Mongo } from 'meteor/mongo';

const Plans = new Mongo.Collection("plans");

var Schema = {};

Schema.WeekMeals = new SimpleSchema({
  full: {
    type: String,
    label: "Main dish ID",
    optional: true
  },
  main: {
    type: String,
    label: "Main dish ID",
    optional: true
  },
  side: {
    type: String,
    label: "Side dish ID",
    optional: true
  },
  servings: {
    type: Number,
    label: "Servings for this meal",
    optional: true
  },
  date: {
    type: Date,
    label: "Date of meal",
    optional: true
  }
});

Plans.attachSchema(new SimpleSchema({
  user: {
    type: String,
    label: "Plan owner"
  },
  week: {
    type: Number,
    label: "Week number"
  },
  year: {
    type: Number,
    label: "Year week falls in"
  },
  meals: {
    type: [Schema.WeekMeals],
    label: "Meals for the week"
  },
}));

export default Plans;

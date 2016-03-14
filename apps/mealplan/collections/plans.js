import { Mongo } from 'meteor/mongo';
import Measurements from 'mealplan/lib/measurements';
const Plans = new Mongo.Collection('plans');

var Schema = {};

Schema.WeekMeals = new SimpleSchema({
  full: {
    type: String,
    label: 'Main dish ID',
    optional: true
  },
  main: {
    type: String,
    label: 'Main dish ID',
    optional: true
  },
  side: {
    type: String,
    label: 'Side dish ID',
    optional: true
  },
  servings: {
    type: Number,
    label: 'Servings for this meal',
    optional: true
  },
  date: {
    type: Date,
    label: 'Date of meal',
    optional: true
  }
});

Schema.shoppingList = new SimpleSchema({
  _id: {
    type: String
  },
  listName: {
    type: String,
    optional: true,
  },
  pluralName: {
    type: String,
    optional: true,
  },
  quantity: {
    type: Number,
    decimal: true,
    optional: true
  },
  measurement: {
    type: String,
    optional: true,
    allowedValues: Measurements
  },
  suffix: {
    type: String,
    optional: true,
    label: "Ingredient suffix"
  }
});


Plans.attachSchema(new SimpleSchema({
  user: {
    type: String,
    label: 'Plan owner'
  },
  week: {
    type: Number,
    label: 'Week number'
  },
  year: {
    type: Number,
    label: 'Year week falls in'
  },
  meals: {
    type: [Schema.WeekMeals],
    label: 'Meals for the week'
  },
  shoppingList: {
    type: [Schema.shoppingList],
    label: 'Shopping list for the week',
    optional: true
  }
}));

export default Plans;

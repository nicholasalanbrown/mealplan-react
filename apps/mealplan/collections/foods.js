import { Mongo } from 'meteor/mongo';

const Foods = new Mongo.Collection("foods");

Foods.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Food name"
  },
  pluralName: {
    type: String,
    label: "Plural form of food name",
    optional: true
  },
  isPaleo: {
    type: Boolean,
    label: "Is this a paleo food?",
    optional: true
  },
  isDairy: {
    type: Boolean,
    label: "Is this a dairy item?"
  }
}));

export default Foods;

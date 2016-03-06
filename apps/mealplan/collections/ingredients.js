import { Mongo } from 'meteor/mongo';

const Ingredients = new Mongo.Collection("ingredients");

Ingredients.attachSchema(new SimpleSchema({
  name: {
      type: String,
      label: "Ingredient name"
  },
  pluralName: {
      type: String,
      label: "Plural form of ingredient name",
      optional: true
  },
  listName: {
      type: String,
      label: "Ingredient name formatted for a dropdown list",
      optional: true
  },
  containsFoods: {
      type: [String],
      label: "Foods this ingredient contains",
      optional: true
  },
  isPaleo: {
    type: Boolean,
    label: "Is this a paleo food?",
    optional: true
  },
  isDairy: {
    type: Boolean,
    label: "Is this a dairy item?",
    optional: true
  }
}));

export default Ingredients;

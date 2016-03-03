import { Mongo } from 'meteor/mongo';

const Recipes = new Mongo.Collection("recipes");

var Schema = {};

Schema.RecipeIngredient = new SimpleSchema({
  _id: {
    type: String
  },
  name: {
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
    allowedValues: ["lbs", "cups", "oz", "tbsp", "tsp", "pinch", "dash", "quart", "pint"],
  },
  suffix: {
    type: String,
    optional: true,
    label: "Ingredient suffix"
  }
});


Recipes.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Recipe title"
  },
  cuisine: {
    type: String,
    label: "Cuisine category",
  },
  servings: {
    type: Number,
    label: "Number of servings"
  },
  type: {
    type: String,
    label: "Type of dish",
    allowedValues: ["main", "side", "full"],
  },
  ingredients: {
    type: [Schema.RecipeIngredient],
    label: "List of ingredients and quantities"
  },
  foods: {
    type: [String],
    label: "Foods this recipe contains",
    optional: true
  },
  compatibleSides: {
    type: [String],
    label: "Compatible side dishes if a main",
    optional: true
  },
  isPaleo: {
    type: Boolean,
    label: "Is this a paleo recipe"
  },
  hasDairy: {
    type: Boolean,
    label: "Does this contain dairy?"
  },
  instructions: {
    type: [String],
    label: "List of instructions"
  }
}));

export default Recipes;

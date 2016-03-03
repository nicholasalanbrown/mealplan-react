import { Mongo } from 'meteor/mongo';

const Recipes = new Mongo.Collection("recipes");

var Schema = {};

Schema.RecipeIngredient = new SimpleSchema({
  _id: {
    type: String,
    autoform : {
      options: function () {

        return Nutrition.find().map(function(n){return {label: n.name.long, value: n.name.long};})

        /*
        let names = Nutrition.find().map(function(item){return {label: item.name.long, value: item.name.long}})
        return names;

        let names = Ingredients.find({}, {sort: {name: 1}}).map(function(item){return {label: item.name, value: item._id}})
        return names.sort(function (a, b) {
          return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
        });
        */
      }
    }
  },
  name: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  pluralName: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
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
    autoform: {
      type: 'select'
    }
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
    autoform : {
      options: function () {
        let categories = Cuisines.find({}, {sort: {name: 1}}).map(function(item){return {label: item.name, value: item._id}})
        return categories;
      }
    }
  },
  servings: {
    type: Number,
    label: "Number of servings"
  },
  type: {
    type: String,
    label: "Type of dish",
    allowedValues: ["main", "side", "full"],
    autoform: {
      type: 'select',
      options: [{label: "Main dish", value: "main"}, {label: "Side dish", value:"side"}, {label: "Full meal", value: "full"}]
    }
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

import { Mongo } from 'meteor/mongo';

const Cuisines = new Mongo.Collection("cuisines");

Cuisines.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Cuisine name"
  }
}));

export default Cuisines;

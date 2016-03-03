import { Mongo } from 'meteor/mongo';

const Measurements = new Mongo.Collection("measurements");

Measurements.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Measurement name"
  },
  pluralName: {
    type: String,
    label: "Plural measurement name",
    optional: true
  },
}));

export default Measurements;

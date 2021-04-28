const { Schema, model } = require("mongoose");

const rideSchema = Schema({
  name: String,
  owner: String,
  description: String,
  mileage: String,
  consumption: Number,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ride = model("ride", rideSchema);

module.exports = ride;

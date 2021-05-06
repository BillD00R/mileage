const { Schema, model } = require("mongoose");

const rideSchema = Schema({
  name: String,
  owner: String,
  description: String,
  mileage: String,
  consumption: String,
  selectedFile: String,
});

const ride = model("ride", rideSchema);

module.exports = ride;

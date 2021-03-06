const mongoose = require("mongoose");
const models = require("../models/");
const { auth } = require("../middleware/");

const model = models.rides;
const name = model.collection.collectionName;

const getRides = async (req, res) => {
  try {
    if (req.userId) {
      const rides = await model.find({ owner: req.userId });
      return res.status(200).json(rides);
    }

    const rides = await model.find();

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const createRide = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthenticated." });

  const ride = req.body;

  const newRide = new model({ ...ride, owner: req.userId });

  try {
    await newRide.save();

    return res.status(201).json(newRide);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const updateRide = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  const ride = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No ride with id = ${_id}`);

  const updatedRide = await model.findByIdAndUpdate(_id, { ...ride, _id }, { new: true });

  return res.json(updatedRide);
};

const deleteRide = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ride with id = ${id}`);

  await model.findByIdAndRemove(id);

  res.status(204).send("Ride deleted");
};

const fillRoute = (route) => {
  route.get(`/${name}`, auth, getRides);
  route.post(`/${name}`, auth, createRide);
  route.patch(`/${name}/:id`, auth, updateRide);
  route.delete(`/${name}/:id`, auth, deleteRide);
};

const moduleName = () => name;

module.exports = { fillRoute, moduleName };

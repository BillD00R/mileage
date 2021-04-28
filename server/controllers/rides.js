const mongoose = require("mongoose");
const models = require("../models/");
const auth = require("../middleware/");

const model = models.rides;
const name = model.collection.collectionName;

const getRides = async (req, res) => {
  try {
    const rides = await model.find();

    // console.log(postMessages);

    res.status(200).json(rides);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createRide = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthenticated." });

  const ride = req.body;

  const newRide = new model({ ...ride, owner: req.userId, createdAt: new Date().toISOString() });

  try {
    await newRide.save();

    res.status(201).json(newRide);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateRide = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  const ride = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No ride with id = ${_id}`);

  const updatedRide = await model.findByIdAndUpdate(_id, { ...ride, _id }, { new: true });

  res.json(updatedRide);
};

const deleteRide = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ride with id = ${id}`);

  await model.findByIdAndRemove(id);

  res.status(204).send("Ride deleted");
};

const fillRoute = (route) => {
  route.get(`/${name}`, getRides);
  route.post(`/${name}`, auth, createRide);
  route.patch(`/${name}/:id`, auth, updateRide);
  route.delete(`/${name}/:id`, auth, deleteRide);
};

const moduleName = () => name;

module.exports = { fillRoute, moduleName };

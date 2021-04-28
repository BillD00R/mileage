const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../models/");

const model = models.users;
const name = model.collection.collectionName;

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await model.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await model.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await model.create({ email, password: passwordHash, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fillRoute = (route) => {
  route.post("/signIn", signIn);
  route.post("/signUp", signUp);
};

const moduleName = () => name;

module.exports = { fillRoute, moduleName };

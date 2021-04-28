const express = require("express");

const { signIn, signUp } = require("../controllers/users.js");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;

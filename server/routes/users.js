const express = require("express");

const { signIn, signUp } = require("../controllers/users.js");

const router = express.Router();

router.post("/user/signin", signIn);
router.post("/user/signup", signUp);

export default router;

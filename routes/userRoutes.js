const express = require("express");

const { signInUser } = require("../controllers/signInUser");
const { addUser } = require("../controllers/addUser");
const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(signInUser);

module.exports = router;

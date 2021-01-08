const express = require("express");

const { signInUser } = require("../controllers/signInUser");
const { addUser } = require("../controllers/addUser");
const { adk } = require("../controllers/idk");
const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(signInUser);
router.route("/").get(idk);

module.exports = router;

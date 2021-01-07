const User = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");

const addUser = async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;

  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return next(err);
        console.log(hash);
        password = hash;
        let data = await new User({
          email: email,
          password: password,
        });
        data = await data.save();
        sendResponse(200, "User added Sucessfully", data, req, res);
      });
    });
  } catch (err) {
    console.log(err);
    return sendErrorMessage(new AppError(400, "Unsucessful", err), req, res);
  }
};

module.exports = { addUser };

const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
var Key = process.env.JWT_SECRET;

const { generateToken } = require("../helpers/jwtAuth");

const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const cons = require("consolidate");

const signInUser = (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        console.log(newUser.email);
        res.send("User not exist");
      } else {
        const match = bcrypt
          .compare(newUser.password, profile.password)
          .then((result) => {
            //console.log(result);
            if (result) {
              try {
                let jwtToken = generateToken(
                  { email: req.body.email },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                  }
                );
                jwtToken
                  .then((result) => {
                    //console.log(result);
                    res.cookie("jwt", result);
                    sendResponse(
                      200,
                      "Successfully logged in",
                      { jwt: result },
                      req,
                      res
                    );
                  })
                  .catch((err) => {
                    res.send(err);
                  });
              } catch (err) {
                console.log(err);
                return sendErrorMessage(
                  new AppError(
                    500,
                    "Internal Error",
                    "Unable to complete the Request"
                  )
                );
              }
            } else {
              //res.send("Check Credentials Before Logging Again");
              sendResponse(
                200,
                "Check Credentials Before Logging Again",
                result.email,
                req,
                res
              );
            }
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.send(err);
    });
};

module.exports = { signInUser };

const mongoose = require("mongoose");
const uniqid = require("uniqid");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      default: "user" + uniqid(),
    },
    email: {
      type: String,
      required: [true, "Email is required for registration"],
      validate: {
        validator: function () {
          return User.findOne({ email: this.email }).then(function (result) {
            if (result != this.email) {
              console.log("User Already Exits");
              return false;
            } else {
              return true;
            }
          });
        },
        message: "Email Already Exists",
      },
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  console.log("Hashing is implemented");
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      console.log(hash);
      this.password = hash;
    });
  });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;

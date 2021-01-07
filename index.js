const mongoose = require("mongoose");
var express = require("express");
var router = express.Router("mongodb://127.0.0.1:27017/todoList");

mongoose.connect("mongodb://localhost:27017/employee", {
  useNewUrlParser: true,
});
var conn = mongoose.Collection;

var employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  etype: String,
  hourlyrate: Number,
  totalHour: Number,
  total: Number,
});

var empModel = mongoose.model("Employee", employeeSchema);
var employee = empModel.find({});

router.post("/", function (req, res, next) {
  var empDetails = new empModel({
    name: req.body.uname,
    email: req.body.email,
    etype: req.body.emptype,
    hourlyrate: req.body.hrlyrate,
    totalHour: req.body.ttlhr,
    total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr),
  });

  empDetails.save(function (err, req1) {
    if (err) throw err;
    employee.exec(function (err, data) {
      if (err) throw err;
      res.render("index", {
        title: "Employee Records",
        records: data,
        success: "Record Inserted Successfully",
      });
    });
  });
});

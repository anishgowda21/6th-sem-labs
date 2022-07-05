const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var empSchema = new mongoose.Schema({
  empid: "String",
  empname: "String",
  department: "String",
  designation: "String",
  mobile: "String",
  email: "String",
});
var Employee = mongoose.model("employee", empSchema);

var url = "mongodb://127.0.0.1:27017/weblab";

function formateText(results) {
  text = "<h1>List of Employee</h1><br><ul>";
  results.forEach((element) => {
    text +=
      "<li> EmpId : " +
      element.empid +
      " Name : " +
      element.empname +
      " Department : " +
      element.department +
      " Designation : " +
      element.designation +
      " Mobile : " +
      element.mobile +
      "Email : " +
      element.email +
      "</li>";
  });
  text += "</ul>";
  return text;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});

app.post("/addData", (req, res) => {
  var data = req.body;

  mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var emp = new Employee(data);
    emp.save((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("Data saved successfully");
      res.send("Data saved successfully");
    });
  });
});

app.get("/showData", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    Employee.find({}, (err, result) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      res.send(formateText(result));
    });
  });
});

app.get("/sortData", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    Employee.find({})
      .sort({ empid: 1 })
      .exec((err, result) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        res.send(formateText(result));
      });
  });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});

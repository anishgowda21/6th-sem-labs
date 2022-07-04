const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mongoclient = require("mongodb").MongoClient;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var url = "mongodb://127.0.0.1/27017/";

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
  var empidpt = /^emp[0-9]{4}$/;
  var emailpt = /^\w@[a-zA-Z0-9]+?\.[a-zA-Z]$/;
  var mobilept = /^[0-9]{10}$/;
  req.checkBody("empid", "EmpId is required").notEmpty();
  req.checkBody("empname", "Name is required").notEmpty();
  req.checkBody("department", "Department is required").notEmpty();
  req.checkBody("designation", "Designation is required").notEmpty();
  req.checkBody("mobile", "Mobile is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("empid", "EmpId is not valid").matches(empidpt);
  req.checkBody("email", "Email is not valid").matches(emailpt);
  req.checkBody("mobile", "Mobile is not valid").matches(mobilept);
  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }

  mongoclient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("connected to mongoDB");
    var db = client.db("weblab");
    var collection = db.collection("employee");
    collection.insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      res.send(result);
      console.log("data inserted");
      client.close();
    });
  });
});

app.get("/showData", (req, res) => {
  mongoclient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("connected to mongoDB");
    var db = client.db("weblab");
    var collection = db.collection("employee");
    collection.find().toArray((err, result) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      if (result.length == 0) {
        res.send("No data found");
      } else {
        res.header("Context-Type", "text/html");
        res.send(formateText(result));
      }
      client.close();
    });
  });
});

app.get("/sortData", (req, res) => {
  mongoclient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("connected to mongoDB");
    var db = client.db("weblab");
    var collection = db.collection("employee");
    collection
      .find()
      .sort({ empid: 1 })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        if (result.length == 0) {
          res.send("No data found");
        } else {
          res.header("Context-Type", "text/html");
          res.send(formateText(result));
        }
        client.close();
      });
  });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});

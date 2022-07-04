const express = require("express");
const mongoclient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
var url = "mongodb://127.0.0.1:27017/";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/showData", (req, res) => {
  var usn = req.query.usn;
  mongoclient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    var db = client.db("weblab");
    var collection = db.collection("users");
    collection.findOne({ usn: usn }, (err, result) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      if (result == null) {
        result = "No data found";
      }
      res.send(result);
      client.close();
    });
  });
});

app.post("/addData", (req, res) => {
  var data = req.body;

  var usnPat = /^[1][A-Za-z][A-Za-z][0-9][0-9][A-Za-z][A-Za-z][0-9][0-9][0-9]$/;
  req.checkBody("usn", "Usn should not be empty").notEmpty();
  req.checkBody("usn", "Usn should be of correct format").matches(usnPat);
  req.checkBody("name", "Name should not be empty").notEmpty();
  req.checkBody("name", "Name should be of correct format").isAlpha();
  req.checkBody("semester", "Sem should not be empty").notEmpty();
  req.checkBody("branch", "Branch should not be empty").notEmpty();
  req.checkBody("college", "College should not be empty").notEmpty();
  req.checkBody("adhaar", "Adhaar should not be empty").notEmpty();
  req.checkBody("passport", "Passport should not be empty").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }

  mongoclient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log("Connected to MongoDB");
    var db = client.db("weblab");
    var collection = db.collection("users");
    collection.insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(result);
      var text =
        "Usn : " +
        data.usn +
        "<br> Name : " +
        data.name +
        "<br> Sex : " +
        data.sex +
        "<br> Semester :" +
        data.semester +
        "<br> Branch : " +
        data.branch +
        "<br> College : " +
        db.college +
        "<br> Adhaar : " +
        data.adhaar +
        "<br> Passport : " +
        data.passport +
        "<br> <h3>Data Inserted Successfully</h3>";
      res.header("Content-Type", "text/html");
      res.end(text);
      client.close();
    });
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

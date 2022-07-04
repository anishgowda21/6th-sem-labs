const express = require("express");
const mongoclient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

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
      res.send(result);
      client.close();
    });
  });
});

app.post("/addData", (req, res) => {
  var data = req.body;
  console.log(data);
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

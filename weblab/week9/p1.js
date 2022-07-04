const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  // Get the data from the form
  const data = req.query;
  var text =
    "Name: <b>" +
    data.name +
    "</b> Branch:<u>" +
    data.branch +
    "</u> Semester: " +
    data.sem;
  res.setHeader("Content-Type", "text/html");
  res.send(text);
});

app.post("/getData", (req, res) => {
  var data = req.body;
  var text =
    "Name: <b>" +
    data.name +
    "</b> Branch:<u>" +
    data.branch +
    "</u> Semester: " +
    data.sem;
  res.setHeader("Content-Type", "text/html");
  res.send(text);
});

var server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/base3.html");
});

app.post("/process_post", (req, res) => {
  req.checkBody("name", "Name should not be empty").notEmpty();
  req.checkBody("marks", "Marks must be numeric").isNumeric();
  var err = req.validationErrors();
  res.header("Content-Type", "text/html");
  if (err) {
    res.send(err);
  } else {
    var text =
      "Usn: " +
      req.body.usn +
      "<br> Name: " +
      req.body.name +
      "<br> Marks: " +
      req.body.marks +
      "<br> Branch: " +
      req.body.branch;
    res.send(text);
  }
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

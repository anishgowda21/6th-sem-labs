// node js program to create cutom middleware 1.Logger 2.no of visits

const express = require("express");
const app = express();
const port = 3000;
var count = 0;
var logger = (req, res, next) => {
  var time = new Date().toLocaleString();
  console.log("Logged: " + time);
  next();
};

var visits = (req, res, next) => {
  count++;
  console.log("Visits: " + count);
  next();
};

app.use(logger);
app.use(visits);

app.get("/", (req, res) => {
  res.end("Welcome to my website");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Create a custom middle ware that print url and timestamp when a request is received.

const express = require("express");
const app = express();
const port = 3000;

const timeStamp = (req, res, next) => {
  var curr_date = new Date();
  var stamp = curr_date.toLocaleString();
  req.stamp = stamp;
  console.log(stamp);
  next();
};

const urlLogger = (req, res, next) => {
  req.cur_url = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(req.cur_url);
  next();
};
app.use(urlLogger);
app.use(timeStamp);

app.get("/", (req, res) => {
  var data = "TimeStamp: " + req.stamp + "<br>" + "URL: " + req.cur_url;
  res.end(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

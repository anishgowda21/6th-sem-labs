const express = require("express");
app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/rit", (req, res) => {
  res.sendFile(__dirname + "/rit.html");
});

app.get("/bmsce", (req, res) => {
  res.sendFile(__dirname + "/bmsce.html");
});

app.get("/rvce", (req, res) => {
  res.sendFile(__dirname + "/rvce.html");
});

app.get("/nit", (req, res) => {
  res.sendFile(__dirname + "/nit.html");
});

app.get("/mit", (req, res) => {
  res.sendFile(__dirname + "/mit.html");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

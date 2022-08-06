const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/cse", (req, res) => {
    res.sendFile(__dirname + '/cse.html');
})

app.get("/ise", (req, res) => {
    res.sendFile(__dirname + '/ise.html');
})

app.get("/ece", (req, res) => {
    res.sendFile(__dirname + '/ece.html');
})

app.get("/me", (req, res) => {
    res.sendFile(__dirname + '/me.html');
})

app.listen(3000, () => console.log("Running on port 3000"));
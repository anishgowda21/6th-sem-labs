// 10.		(a)	Write a node.js Express program to create a custom middleware functions for
// i.	Logger   
// ii.	No. of time the visitor visited the website


const express = require("express");
const app = express();

var count = 0;

function counter(req, res, next) {
    count++;
    console.log("Visit count: " + count);
    next();
}

function logger(req, res, next) {
    var timeStamp = new Date().toLocaleString();
    var url = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log(timeStamp + " " + url);
    console.log("Method: " + req.method);
    next();
}

app.use(counter);
app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => console.log("Server started at port 3000"));
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const mongoose = require('mongoose');
db.connect('cie_marks');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var stdSchema = new mongoose.Schema({
    usn: String,
    name: String,
    subCode: String,
    marks: Number
});
var student = mongoose.model('student', stdSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/getData", (req, res) => {
    var data = req.query;
    console.log(data);
    var mod = new student(data);
    mod.save((err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.header("content-type", "text/html");
            res.send("Data Inserted<br>" + result);
        }
    })
})

app.get("/showData", (req, res) => {
    //Get student with less then 20 marks
    var query = { marks: { $lt: 20 } };
    student.find(query, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            var text = "<h2>Students with less then 20 marks</h2> <br>";
            text += "<ul>"
            res.header("content-type", "text/html");
            result.forEach(element => {
                text += "<li>" + element + "</li>";
            });
            text += "</ul>";
            res.send(text);
        }
    })
})



app.listen(3000, () => console.log('Example app listening on port 3000!'));
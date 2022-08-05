const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const mongoose = require('mongoose');
db.connect('exam_fee');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var stdSchema = new mongoose.Schema({
    usn: String,
    name: String,
    semester: Number,
    examFee: {
        type: Number,
        default: 0
    }
});
var student = mongoose.model('student', stdSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/getData", (req, res) => {
    var data = req.query;
    data.examFee = data.examFee ? data.examFee : 0;
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
    // Get Student with exam fee equal to 0
    var query = { examFee: 0 };
    student.find(query, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            var text = "<h2>students who have not paid exam fees</h2> <br>";
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
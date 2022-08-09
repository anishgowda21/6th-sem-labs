// 5(b)	Write a  Node.js Express and Mongo  program to accept ‘Student’ information viz. Name, USN, Dept, Grade from a web page and store the 
// information in a database and update Student grade  with the name specified by the user and display the results.


const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const expressValidator = require('express-validator');
const app = express();
const url = 'mongodb://127.0.0.1:27017/student_info';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/addData", (req, res) => {
    var data = req.body;
    var usnPar = /^1[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2,3}[0-9]{3}$/
    var gradePat = /^[a-fA-FsS]$/
    req.checkBody('name', 'Name should be Charecter').isAlpha();
    req.checkBody('usn', 'USN should be valid').matches(usnPar);
    req.checkBody('grade', 'Grade should be between A and F').matches(gradePat);
    var err = req.validationErrors();
    if (err) {
        return res.send(err);
    }
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.insert(data, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.header("content-type", "text/html");
                res.send("Data Inserted<br>" + JSON.stringify(result));
            }
        })
    })
})

app.get("/viewData", (req, res) => {
    var name = req.query.name;
    var grade = req.query.grade
    var query = { name: name }
    var change = { $set: { grade } }
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.updateOne(query, change, (err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.nModified == 0) {
                return res.send("No Record Found");
            }
            var text = "Record Updated<br>";
            text += "Name: " + name + "<br>";
            text += "Grade: " + grade + "<br>";
            res.send(text);
        })
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
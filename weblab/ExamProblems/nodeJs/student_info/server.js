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
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.find({ name: name }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            var text = "<h2>Student Details</h2> <br>";
            text += "Name : " + result[0].name + "<br>";
            text += "USN : " + result[0].usn + "<br>";
            text += "Grade : " + result[0].grade + "<br>";
            text += "Department : " + result[0].dept + "<br>";
            res.header("content-type", "text/html");
            res.send(text);

        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
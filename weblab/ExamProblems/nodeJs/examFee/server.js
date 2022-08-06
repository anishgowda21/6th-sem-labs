const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;

const app = express();
const url = 'mongodb://127.0.0.1:27017/exam_fee';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/getData", (req, res) => {
    var data = req.query;
    data.examFee = data.examFee ? parseInt(data.examFee) : 0;
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

app.get("/showData", (req, res) => {
    // Get Student with exam fee equal to 0
    var query = { examFee: 0 };
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.find(query).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            var text = "<h2>students who have not paid exam fees</h2> <br>";
            text += "<ul>"
            res.header("content-type", "text/html");
            result.forEach(element => {
                text += "<li>" + JSON.stringify(element) + "</li>";
            });
            text += "</ul>";
            res.send(text);
        })
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));
// 1 	(b)	Using Node.js Express and Mongo, implement a  program to accept USN, Name, 
// Subject_code, CIE marks  and store the information in a database and display students whose CIE<20

const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/cie_marks';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/getData", (req, res) => {
    var data = req.query;
    console.log(data);
    // Must use mongodb only in exam also
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.insert(data, (err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            res.send(result);
        });
    })
})

app.get("/showData", (req, res) => {
    //Get student with less then 20 marks
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        var query = { marks: { $lt: 20 } };
        collection.find(query).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            var text = "<h2>Students with less then 20 marks</h2> <br>";
            text += "<ul>"
            res.header("content-type", "text/html");
            result.forEach(element => {
                text += "<li>" + JSON.stringify(element) + "</li>";
            });
            text += "</ul>";
            res.send(text);
            db.close();
        })
    })
})



app.listen(3000, () => console.log('Example app listening on port 3000!'));
// 9 b (b)	Write a Node.js Express and Mongo  program to accept User Name, Branch, Semester, 
//  from web page and display all the students who belongs to 6th Semester and CSE branch. 

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/student_branch';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/addData", (req, res) => {
    var data = req.body;
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        data.sem = parseInt(data.sem);
        data.branch = data.branch.toUpperCase();
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
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.find({ sem: 6, branch: "CSE" }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            var text = "<h2>Student Who belong to sem 6 and cse dept</h2> <br>";
            result.forEach(element => {
                text += "<br>Name: " + element.name + "<br>";
                text += "Branch: " + element.branch + "<br>";
                text += "Semester: " + element.sem + "<br>";
            })
            res.send(text);

        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
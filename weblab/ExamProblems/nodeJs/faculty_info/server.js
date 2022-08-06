// 10 b (b)	Write a  Node.js Express and Mongo program to accept the  
// fields ‘ID’, ‘Title’, ‘Name’, and ‘branch’ of a faculty and store it in the database. 
// Display all the faculty who belongs "CSE" branch and Title is "PROFESSOR".

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/fac_info';

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
        var collection = db.collection('faculty');
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
        var collection = db.collection('faculty');
        collection.find({ branch: "CSE", title: "PROFESSOR" }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            var text = "<h2>Faculty INFO</h2> <br>";
            result.forEach(element => {
                text += "<br>ID: " + element.id + "<br>";
                text += "Name: " + element.name + "<br>";
                text += "title: " + element.title + "<br>";
                text += "Branch: " + element.branch + "<br>";
            })
            res.send(text);

        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
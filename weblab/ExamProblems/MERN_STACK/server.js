// (b)	Create an Exam Management system using MERN Stack Framework for creating student database and  
// display students who have secure 'S' grade. (Use Appropriate fields)


const express = require('express');
var path = require("path");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/exam_manage';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var srcpath = path.join(__dirname, '/public');
app.use(express.static('public'));

function getGrade(percentage) {
    if (percentage <= 100 && percentage >= 90) {
        return ("S")
    }

    else if (percentage <= 89 && percentage >= 80) {
        return ("A")
    }

    else if (percentage <= 79 && percentage >= 70) {
        return ("B")
    }

    else if (percentage <= 69 && percentage >= 60) {
        return ("C")
    }

    else if (percentage < 60) {
        return ("F")
    }
}

app.get('/', (req, res) => {
    res.sendFile(srcpath + '/index.html');
});

app.get("/insert", (req, res) => {
    res.sendFile(srcpath + '/insert.html');
})

app.post("/api/addData", (req, res) => {
    var data = req.body;
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var percentage = ((parseInt(data.sub1) + parseInt(data.sub2) + parseInt(data.sub3) + parseInt(data.sub4)) / 400) * 100;
        data.grade = getGrade(percentage);
        var collection = db.collection('students');
        data.grade = data.grade.toUpperCase();
        collection.insert(data, (err, result) => {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else {
                data.serverMessage = "Data inserted successfully";
                res.header("content-type", "application/json");
                res.json({
                    "status": "success",
                    "studentData": data
                })
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
        collection.find({ grade: "S" }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            res.render("viewData.ejs", { data: result });
        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
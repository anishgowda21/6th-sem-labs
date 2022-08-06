const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/exam_manage';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    res.sendFile(__dirname + '/index.html');
});

app.post("/addData", (req, res) => {
    var data = req.body;
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var percentage = ((parseInt(data.sub1) + parseInt(data.sub2) + parseInt(data.sub3)) / 300) * 100;
        data.grade = getGrade(percentage);
        var collection = db.collection('students');
        data.grade = data.grade.toUpperCase();
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
        collection.find({ grade: "S" }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            var text = "<h2>Student With S Grade</h2> <br>";
            result.forEach(element => {
                text += "<br>Name: " + element.name + "<br>";
                text += "Roll No: " + element.usn + "<br>";
                text += "Department: " + element.dept + "<br>";
                text += "Grade: " + element.grade + "<br>";
            })
            res.send(text);

        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));
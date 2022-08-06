// 3(b)	Write a node.js Express and Mongo program to create 'HR' database with the collection 'employees' 
// having the fields like emp_name,email,phone, hire_date, job_title,salary. Accept these fields information 
// from a web page and to store it in the database and display all the employee details whose  salary>50000.

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;

const app = express();
const url = 'mongodb://127.0.0.1:27017/hr';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/addData", (req, res) => {
    var data = req.query;
    data.empSalary = data.empSalary ? parseInt(data.empSalary) : 0;
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('employees');
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
    // Get Employee Deatils with salary greater than 50000
    var query = { empSalary: { $gt: 50000 } };
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('employees');
        collection.find(query).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            var text = "<h2>Employees who have salary greater than 50000</h2> <br>";
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

app.listen(3000, () => console.log("App running on port 3000"));
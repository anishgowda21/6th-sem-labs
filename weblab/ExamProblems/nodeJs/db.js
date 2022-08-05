//Commen for all 

const mongoose = require('mongoose');

function connect(dbName) {
    var url = "mongodb://127.0.0.1:27017/" + dbName;
    var db = mongoose.connect(url, (err) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log("Connected to " + dbName);
        }
    })
    return db;
}

module.exports = {
    connect: connect
}
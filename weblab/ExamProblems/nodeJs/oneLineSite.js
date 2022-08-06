// 4(b)	Write a Node.js  program using Express framework and create an on-line training  site with three  pages of 
// content: Home, Registration, Announcements & Contact. Use routing to swap between them.

const express = require('express');
const app = express();

app.get("/", (req, res) => {
    var text = `Home page <br>
    <a href='/registration'>Registration</a> <br>
    <a href='/announcements'>Announcements</a> <br> 
    <a href='/contact'>Contact</a> <br>
    `;
    res.header("Content-Type", "text/html");
    res.send(text);
})

app.get("/registration", (req, res) => {
    var text = `Registration page <br>
    <a href='/'>Home</a> <br>
    <a href='/announcements'>Announcements</a> <br> 
    <a href='/contact'>Contact</a> <br>
    `;
    res.header("Content-Type", "text/html");
    res.send(text);
})

app.get("/announcements", (req, res) => {
    var text = `Announcements page <br>
    <a href='/'>Home</a> <br>
    <a href='/registration'>Registration</a> <br> 
    <a href='/contact'>Contact</a> <br>
    `;
    res.header("Content-Type", "text/html");
    res.send(text);
})

app.get("/contact", (req, res) => {
    var text = `Contact page <br>
    <a href='/'>Home</a> <br>
    <a href='/registration'>Registration</a> <br> 
    <a href='/announcements'>Announcements</a> <br>
    `;
    res.header("Content-Type", "text/html");
    res.send(text);
})

app.listen(3000, () => console.log("Server started at port 3000"));
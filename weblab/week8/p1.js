const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const { error } = require("console");

var server = http.createServer((req, res) => {
  var url_parts = url.parse(req.url, true);
  var body = "";

  if (url_parts.pathname == "/")
    fs.readFile("./week8\\form.html", (err, data) => {
      if (err) {
        console.log(err.toString());
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Not Found</h1>");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        console.log("Serving form.html");
        res.write(data);
      }
    });

  if (req.method === "GET") {
    if (url_parts.pathname === "/getData") {
      console.log("Serving getData");
      console.log(
        "Sent data are (GET):" +
          url_parts.query.name +
          " and age" +
          url_parts.query.age
      );
      res.end(
        "Sent data are (GET):" +
          url_parts.query.name +
          " and age" +
          url_parts.query.age
      );
    }
  } else if (req.method === "POST") {
    if (url_parts.pathname === "/getData") {
      console.log("Serving getData(POST)");
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        var post_data = qs.parse(body);
        console.log(
          "Sent data are (POST):" + post_data.name + " and age" + post_data.age
        );
        res.end(
          "Sent data are (POST):" + post_data.name + " and age" + post_data.age
        );
      });
    }
  }
});
server.listen(3000);
console.log("Server is listening on port 3000");

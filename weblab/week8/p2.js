// Node program to impliment all file handling operations

const fs = require("fs");

// Reading and writing file contents Synchronously
var readme = fs.readFileSync("./week8/testfile.txt", "utf8");
console.log(readme);

fs.writeFileSync("./week8/writefileSync.txt", readme);

console.log("File written successfully");

// Reading and writing file contents Asynchronously
fs.readFile("./week8/testfile.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err.toString());
  } else {
    console.log(data);
    fs.writeFile("./week8/writefileAsync.txt", data, (err) => {
      if (err) {
        console.log(err.toString());
      } else {
        console.log("File written successfully");
      }
    });
  }
});

// Write node js web server application to find area of any 3 geometric shapes:
const area = require("./area");
height = 6;
base = 7;
console.log("Area of a triangle is: " + area.triangle(base, height));
console.log("Area of a square is: " + area.square(base));
console.log("Area of a rectangle is: " + area.rectangle(base, height));

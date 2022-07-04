function triangle(base, height) {
  return (base * height) / 2;
}

function square(side) {
  return side * side;
}

function rectangle(width, height) {
  return width * height;
}

module.exports = {
  triangle,
  square,
  rectangle,
};

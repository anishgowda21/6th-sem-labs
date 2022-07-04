// Check a number is automorphic or not

function automorphic(num) {
  let square = num * num;

  while (num > 0) {
    if (num % 10 != square % 10) {
      return false;
    }
    num = Math.floor(num / 10);
    square = Math.floor(square / 10);
  }
  return true;
}

console.log(automorphic(25));

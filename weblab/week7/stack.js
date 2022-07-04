function push(arr, val) {
  arr.push(val);
  console.log("Pushed " + val + " to the stack");
  console.log("Stack: " + arr);
  return arr;
}

function pop(arr) {
  let val = arr.pop();
  console.log("Popped " + val + " from the stack");
  console.log("Stack: " + arr);
  return arr;
}

module.exports = {
  push,
  pop,
};
